-- Privacy-first website analytics and deterministic daily insights for GM Consulting.
--
-- The schema stores no IP address, referrer, contact field, query string,
-- message content or persistent user identifier. Raw rows use a random
-- browser-tab session UUID only after explicit analytics consent and expire
-- after 90 days. Browser roles cannot write directly to any analytics table.

do $$
begin
  if to_regclass('public.analytics_allowed_paths') is not null
     or to_regclass('public.analytics_events') is not null
     or to_regclass('public.analytics_daily_metrics') is not null
     or to_regclass('public.site_insights') is not null
     or to_regprocedure('public.is_analytics_staff()') is not null
     or to_regprocedure(
       'public.record_site_event(text,text,text,uuid,text)'
     ) is not null
     or to_regprocedure('public.refresh_site_insights(date)') is not null then
    raise exception using
      errcode = '42P07',
      message = 'Analytics preflight failed: an expected-new object already exists';
  end if;
end;
$$;

create extension if not exists pg_cron;

create function public.is_analytics_staff()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public, auth
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '')
    in ('staff', 'admin');
$$;

revoke all on function public.is_analytics_staff()
  from public, anon, authenticated;
grant execute on function public.is_analytics_staff() to authenticated;

create table public.analytics_allowed_paths (
  path text primary key check (
    char_length(path) between 1 and 500
    and left(path, 1) = '/'
    and position('?' in path) = 0
    and position('#' in path) = 0
    and position('@' in path) = 0
    and path !~ '[[:cntrl:]]'
  )
);

alter table public.analytics_allowed_paths enable row level security;
revoke all privileges on table public.analytics_allowed_paths
  from public, anon, authenticated;
grant select on table public.analytics_allowed_paths to service_role;

insert into public.analytics_allowed_paths (path)
values
  ('/'),
  ('/accessibilita'),
  ('/aree-di-intervento'),
  ('/assessment'),
  ('/compliance'),
  ('/convenzione-studio'),
  ('/insights'),
  ('/insights/compliance-by-design-workflow-python-gdpr-nis2'),
  ('/insights/iso-37001-37301-dlgs-231-architettura-integrata'),
  ('/insights/uni-pdr-125-2022-premialita-pnrr'),
  ('/metodo'),
  ('/note-legali'),
  ('/protocollo-23')
on conflict (path) do nothing;

create table public.analytics_events (
  id bigint generated always as identity primary key,
  event_name text not null check (
    event_name in ('page_view', 'cta_click', 'lead_submit')
  ),
  page_path text not null references public.analytics_allowed_paths(path),
  language text not null check (language = 'it'),
  session_id uuid not null,
  target text check (
    target is null
    or target in (
      'areas', 'assessment', 'compliance', 'insights', 'method', 'protocollo_23'
    )
  ),
  occurred_at timestamptz not null default now(),
  check (
    (event_name = 'page_view' and target is null)
    or (event_name = 'cta_click' and target is not null)
    or (
      event_name = 'lead_submit'
      and target is not null
      and (
        (target = 'assessment' and page_path = '/assessment')
        or (target = 'protocollo_23' and page_path = '/protocollo-23')
      )
    )
  )
);

create index analytics_events_occurred_at_idx
  on public.analytics_events (occurred_at desc);
create index analytics_events_session_occurred_at_idx
  on public.analytics_events (session_id, occurred_at desc);

alter table public.analytics_events enable row level security;
revoke all privileges on table public.analytics_events
  from public, anon, authenticated;
grant select on table public.analytics_events to authenticated;
grant select, insert, delete on table public.analytics_events to service_role;

drop policy if exists "Analytics staff read raw events"
  on public.analytics_events;
create policy "Analytics staff read raw events"
on public.analytics_events
for select
to authenticated
using (public.is_analytics_staff());

create function public.record_site_event(
  p_event_name text,
  p_page_path text,
  p_language text,
  p_session_id uuid,
  p_target text default null
)
returns bigint
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_id bigint;
begin
  if p_event_name not in ('page_view', 'cta_click', 'lead_submit') then
    raise exception using errcode = '22023', message = 'Invalid event name';
  end if;
  if p_page_path is null or not exists (
    select 1 from public.analytics_allowed_paths where path = p_page_path
  ) then
    raise exception using errcode = '22023', message = 'Invalid page path';
  end if;
  if p_language <> 'it' then
    raise exception using errcode = '22023', message = 'Invalid language';
  end if;
  if p_session_id is null then
    raise exception using errcode = '22023', message = 'Invalid session';
  end if;
  if p_target is not null and p_target not in (
    'areas', 'assessment', 'compliance', 'insights', 'method', 'protocollo_23'
  ) then
    raise exception using errcode = '22023', message = 'Invalid target';
  end if;
  if p_event_name = 'page_view' and p_target is not null then
    raise exception using errcode = '22023', message = 'Page views cannot have a target';
  end if;
  if p_event_name = 'cta_click' and p_target is null then
    raise exception using errcode = '22023', message = 'CTA target is required';
  end if;
  if p_event_name = 'lead_submit' and (
    p_target is null
    or not (
      (p_target = 'assessment' and p_page_path = '/assessment')
      or (p_target = 'protocollo_23' and p_page_path = '/protocollo-23')
    )
  ) then
    raise exception using errcode = '22023', message = 'Invalid conversion target';
  end if;

  -- Serialize database-controlled limits and duplicate suppression.
  perform pg_advisory_xact_lock(8062422210840691601);

  if p_event_name = 'page_view' then
    select event.id into v_id
    from public.analytics_events as event
    where event.session_id = p_session_id
      and event.event_name = 'page_view'
      and event.page_path = p_page_path
      and event.occurred_at >= now() - interval '2 seconds'
    order by event.occurred_at desc
    limit 1;
    if v_id is not null then return v_id; end if;
  end if;

  if (
    select count(*)
    from public.analytics_events
    where occurred_at >= now() - interval '1 minute'
  ) >= 120 or (
    select count(*)
    from public.analytics_events
    where occurred_at >= now() - interval '1 hour'
  ) >= 2000 then
    raise exception using
      errcode = 'P0001', message = 'Global analytics rate limit exceeded';
  end if;

  if (
    select count(*)
    from public.analytics_events
    where session_id = p_session_id
      and occurred_at >= now() - interval '1 hour'
  ) >= 120 then
    raise exception using errcode = 'P0001', message = 'Too many events';
  end if;

  insert into public.analytics_events (
    event_name, page_path, language, session_id, target
  ) values (
    p_event_name, p_page_path, p_language, p_session_id, p_target
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.record_site_event(text, text, text, uuid, text)
  from public, anon, authenticated;
grant execute on function public.record_site_event(text, text, text, uuid, text)
  to service_role;

create table public.analytics_daily_metrics (
  metric_date date not null,
  page_path text not null references public.analytics_allowed_paths(path),
  language text not null check (language = 'it'),
  page_views integer not null default 0 check (page_views >= 0),
  unique_sessions integer not null default 0 check (unique_sessions >= 0),
  cta_clicks integer not null default 0 check (cta_clicks >= 0),
  lead_submits integer not null default 0 check (lead_submits >= 0),
  generated_at timestamptz not null default now(),
  primary key (metric_date, page_path, language)
);

create index analytics_daily_metrics_path_date_idx
  on public.analytics_daily_metrics (page_path, metric_date desc);

alter table public.analytics_daily_metrics enable row level security;
revoke all privileges on table public.analytics_daily_metrics
  from public, anon, authenticated;
grant select on table public.analytics_daily_metrics to authenticated;
grant select, insert, update, delete on table public.analytics_daily_metrics
  to service_role;

drop policy if exists "Analytics staff read daily metrics"
  on public.analytics_daily_metrics;
create policy "Analytics staff read daily metrics"
on public.analytics_daily_metrics
for select
to authenticated
using (public.is_analytics_staff());

create table public.site_insights (
  id bigint generated always as identity primary key,
  insight_key text not null check (
    insight_key in ('traffic_change', 'conversion_rate_drop')
  ),
  scope_path text references public.analytics_allowed_paths(path),
  language text not null check (language = 'it'),
  period_start date not null,
  period_end date not null,
  comparison_start date not null,
  comparison_end date not null,
  observed_value numeric(14, 6) not null,
  comparison_value numeric(14, 6) not null,
  delta_ratio numeric(14, 6) not null,
  sample_size integer not null check (sample_size >= 0),
  confidence text not null check (confidence in ('low', 'medium', 'high')),
  priority text not null check (priority in ('low', 'medium', 'high')),
  interpretation text not null check (
    char_length(interpretation) between 1 and 1000
  ),
  recommended_action text not null check (
    char_length(recommended_action) between 1 and 1000
  ),
  source text not null default 'deterministic_daily_v1' check (
    source = 'deterministic_daily_v1'
  ),
  generated_at timestamptz not null default now(),
  check (period_start <= period_end),
  check (comparison_start <= comparison_end),
  check (comparison_end < period_start)
);

create unique index site_insights_daily_scope_idx
  on public.site_insights (
    insight_key, period_end, language, coalesce(scope_path, '')
  );
create index site_insights_generated_at_idx
  on public.site_insights (generated_at desc);

alter table public.site_insights enable row level security;
revoke all privileges on table public.site_insights
  from public, anon, authenticated;
grant select on table public.site_insights to authenticated;
grant select, insert, update, delete on table public.site_insights
  to service_role;

drop policy if exists "Analytics staff read generated insights"
  on public.site_insights;
create policy "Analytics staff read generated insights"
on public.site_insights
for select
to authenticated
using (public.is_analytics_staff());

create function public.refresh_site_insights(
  p_as_of date default (timezone('UTC', now())::date)
)
returns table (
  metric_rows integer,
  insight_rows integer,
  purged_event_rows integer
)
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_current_start date;
  v_current_end date;
  v_comparison_start date;
  v_comparison_end date;
  v_metric_rows integer := 0;
  v_inserted integer := 0;
  v_insight_rows integer := 0;
  v_purged_event_rows integer := 0;
begin
  if p_as_of is null then
    raise exception using
      errcode = '22023', message = 'Analytics refresh date is required';
  end if;

  v_current_start := p_as_of - 7;
  v_current_end := p_as_of - 1;
  v_comparison_start := p_as_of - 14;
  v_comparison_end := p_as_of - 8;

  perform pg_advisory_xact_lock(8062422210840691602);

  delete from public.analytics_daily_metrics
  where metric_date between v_comparison_start and v_current_end;

  insert into public.analytics_daily_metrics (
    metric_date,
    page_path,
    language,
    page_views,
    unique_sessions,
    cta_clicks,
    lead_submits,
    generated_at
  )
  select
    (event.occurred_at at time zone 'UTC')::date,
    event.page_path,
    event.language,
    count(*) filter (where event.event_name = 'page_view')::integer,
    count(distinct event.session_id)::integer,
    count(*) filter (where event.event_name = 'cta_click')::integer,
    count(*) filter (where event.event_name = 'lead_submit')::integer,
    now()
  from public.analytics_events as event
  where event.occurred_at >= (v_comparison_start::timestamp at time zone 'UTC')
    and event.occurred_at < ((v_current_end + 1)::timestamp at time zone 'UTC')
  group by
    (event.occurred_at at time zone 'UTC')::date,
    event.page_path,
    event.language;
  get diagnostics v_metric_rows = row_count;

  delete from public.site_insights
  where period_end = v_current_end
    and source = 'deterministic_daily_v1';

  with weekly as (
    select
      metric.page_path,
      metric.language,
      coalesce(sum(metric.page_views) filter (
        where metric.metric_date between v_current_start and v_current_end
      ), 0)::integer as current_views,
      coalesce(sum(metric.page_views) filter (
        where metric.metric_date between v_comparison_start and v_comparison_end
      ), 0)::integer as comparison_views
    from public.analytics_daily_metrics as metric
    where metric.metric_date between v_comparison_start and v_current_end
    group by metric.page_path, metric.language
  ), qualified as (
    select
      weekly.*,
      (weekly.current_views - weekly.comparison_views)::numeric
        / weekly.comparison_views::numeric as delta_ratio
    from weekly
    where weekly.current_views >= 20
      and weekly.comparison_views >= 20
      and abs(
        (weekly.current_views - weekly.comparison_views)::numeric
          / weekly.comparison_views::numeric
      ) >= 0.30
  )
  insert into public.site_insights (
    insight_key,
    scope_path,
    language,
    period_start,
    period_end,
    comparison_start,
    comparison_end,
    observed_value,
    comparison_value,
    delta_ratio,
    sample_size,
    confidence,
    priority,
    interpretation,
    recommended_action
  )
  select
    'traffic_change',
    qualified.page_path,
    qualified.language,
    v_current_start,
    v_current_end,
    v_comparison_start,
    v_comparison_end,
    qualified.current_views,
    qualified.comparison_views,
    round(qualified.delta_ratio, 6),
    qualified.current_views + qualified.comparison_views,
    case
      when qualified.current_views + qualified.comparison_views >= 200 then 'high'
      when qualified.current_views + qualified.comparison_views >= 80 then 'medium'
      else 'low'
    end,
    case
      when qualified.delta_ratio <= -0.50 then 'high'
      when qualified.delta_ratio <= -0.30 then 'medium'
      else 'low'
    end,
    format(
      'Le visualizzazioni consentite di %s sono variate del %s%% rispetto alla settimana completa precedente. È un''associazione osservata, non una prova di causalità.',
      qualified.page_path,
      round(qualified.delta_ratio * 100, 1)
    ),
    case
      when qualified.delta_ratio < 0 then
        'Verificare disponibilità, indicizzazione e percorsi interni prima di modificare contenuti o acquisizione.'
      else
        'Verificare le azioni successive per capire quali incrementi meritano di essere sostenuti.'
    end
  from qualified;
  get diagnostics v_inserted = row_count;
  v_insight_rows := v_insight_rows + v_inserted;

  with weekly as (
    select
      metric.language,
      coalesce(sum(metric.page_views) filter (
        where metric.metric_date between v_current_start and v_current_end
      ), 0)::integer as current_views,
      coalesce(sum(metric.lead_submits) filter (
        where metric.metric_date between v_current_start and v_current_end
      ), 0)::integer as current_conversions,
      coalesce(sum(metric.page_views) filter (
        where metric.metric_date between v_comparison_start and v_comparison_end
      ), 0)::integer as comparison_views,
      coalesce(sum(metric.lead_submits) filter (
        where metric.metric_date between v_comparison_start and v_comparison_end
      ), 0)::integer as comparison_conversions
    from public.analytics_daily_metrics as metric
    where metric.metric_date between v_comparison_start and v_current_end
    group by metric.language
  ), rates as (
    select
      weekly.*,
      weekly.current_conversions::numeric / weekly.current_views::numeric
        as current_rate,
      weekly.comparison_conversions::numeric / weekly.comparison_views::numeric
        as comparison_rate
    from weekly
    where weekly.current_views >= 100
      and weekly.comparison_views >= 100
      and weekly.comparison_conversions >= 3
  ), qualified as (
    select
      rates.*,
      (rates.current_rate - rates.comparison_rate) / rates.comparison_rate
        as delta_ratio
    from rates
    where rates.current_rate <= rates.comparison_rate * 0.70
  )
  insert into public.site_insights (
    insight_key,
    scope_path,
    language,
    period_start,
    period_end,
    comparison_start,
    comparison_end,
    observed_value,
    comparison_value,
    delta_ratio,
    sample_size,
    confidence,
    priority,
    interpretation,
    recommended_action
  )
  select
    'conversion_rate_drop',
    null,
    qualified.language,
    v_current_start,
    v_current_end,
    v_comparison_start,
    v_comparison_end,
    round(qualified.current_rate, 6),
    round(qualified.comparison_rate, 6),
    round(qualified.delta_ratio, 6),
    qualified.current_views + qualified.comparison_views,
    case
      when qualified.current_views + qualified.comparison_views >= 1000 then 'high'
      when qualified.current_views + qualified.comparison_views >= 400 then 'medium'
      else 'low'
    end,
    case when qualified.delta_ratio <= -0.50 then 'high' else 'medium' end,
    format(
      'Il tasso di invio consentito è variato del %s%% rispetto alla settimana completa precedente. È un''associazione osservata, non una prova di causalità.',
      round(qualified.delta_ratio * 100, 1)
    ),
    'Verificare consegna dei moduli, CTA e disponibilità operativa prima di modificare acquisizione o contenuti.'
  from qualified;
  get diagnostics v_inserted = row_count;
  v_insight_rows := v_insight_rows + v_inserted;

  delete from public.analytics_events
  where occurred_at < (p_as_of::timestamp at time zone 'UTC') - interval '90 days';
  get diagnostics v_purged_event_rows = row_count;

  delete from public.analytics_daily_metrics
  where metric_date < p_as_of - 400;
  delete from public.site_insights
  where generated_at < now() - interval '365 days';

  return query select
    v_metric_rows,
    v_insight_rows,
    v_purged_event_rows;
end;
$$;

revoke all on function public.refresh_site_insights(date)
  from public, anon, authenticated;
grant execute on function public.refresh_site_insights(date) to service_role;

do $$
begin
  if exists (
    select 1 from cron.job where jobname = 'gm-site-insights-daily'
  ) then
    raise exception using
      errcode = '42P07',
      message = 'Analytics preflight failed: cron job already exists';
  end if;

  perform cron.schedule(
    'gm-site-insights-daily',
    '37 3 * * *',
    'select public.refresh_site_insights();'
  );
end;
$$;

comment on table public.analytics_events is
  'Consent-gated, pseudonymous GM website events with 90-day raw retention; no IP, referrer, contact data or query string.';
comment on table public.analytics_daily_metrics is
  'Daily UTC counts by allowlisted path; retained for 400 days.';
comment on table public.site_insights is
  'Deterministic, sample-gated weekly comparisons for staff review; no causal inference.';
comment on function public.record_site_event(text, text, text, uuid, text) is
  'Validated, allowlisted analytics intake restricted to the service role.';
comment on function public.refresh_site_insights(date) is
  'Idempotently rebuilds 14 completed UTC days, deterministic insights and retention.';
