-- Execute after the matching migration inside one caller-owned transaction.
-- This script uses a savepoint and removes all synthetic rows before returning.
-- The caller must finish the outer transaction with ROLLBACK.

savepoint gm_site_insights_test_data;

do $$
declare
  v_count integer;
begin
  if to_regclass('public.analytics_events') is null
     or to_regclass('public.analytics_daily_metrics') is null
     or to_regclass('public.site_insights') is null then
    raise exception 'One or more analytics tables are missing';
  end if;

  select count(*) into v_count
  from pg_class as relation
  join pg_namespace as namespace on namespace.oid = relation.relnamespace
  where namespace.nspname = 'public'
    and relation.relname in (
      'analytics_allowed_paths',
      'analytics_events',
      'analytics_daily_metrics',
      'site_insights'
    )
    and relation.relrowsecurity;
  if v_count <> 4 then
    raise exception 'Expected RLS on four analytics tables, found %', v_count;
  end if;

  if has_table_privilege('anon', 'public.analytics_events', 'select')
     or has_table_privilege('anon', 'public.analytics_daily_metrics', 'select')
     or has_table_privilege('anon', 'public.site_insights', 'select')
     or has_table_privilege('authenticated', 'public.analytics_events', 'insert')
     or has_table_privilege('authenticated', 'public.analytics_daily_metrics', 'insert')
     or has_table_privilege('authenticated', 'public.site_insights', 'insert') then
    raise exception 'A browser role has anonymous read or direct write access';
  end if;

  if has_function_privilege(
    'anon', 'public.record_site_event(text,text,text,uuid,text)', 'execute'
  ) or has_function_privilege(
    'authenticated', 'public.record_site_event(text,text,text,uuid,text)', 'execute'
  ) or has_function_privilege(
    'anon', 'public.refresh_site_insights(date)', 'execute'
  ) or has_function_privilege(
    'authenticated', 'public.refresh_site_insights(date)', 'execute'
  ) then
    raise exception 'A browser role can execute a privileged analytics function';
  end if;

  if not has_function_privilege(
    'service_role', 'public.record_site_event(text,text,text,uuid,text)', 'execute'
  ) or not has_function_privilege(
    'service_role', 'public.refresh_site_insights(date)', 'execute'
  ) then
    raise exception 'service_role is missing an analytics function grant';
  end if;

  select count(*) into v_count
  from information_schema.columns
  where table_schema = 'public'
    and table_name in (
      'analytics_events', 'analytics_daily_metrics', 'site_insights'
    )
    and column_name in (
      'email', 'name', 'full_name', 'first_name', 'last_name', 'phone',
      'company', 'message', 'notes', 'user_id', 'ip', 'ip_address',
      'query_string', 'referrer', 'referrer_host'
    );
  if v_count <> 0 then
    raise exception 'Analytics tables contain PII-like columns: %', v_count;
  end if;

  select count(*) into v_count
  from cron.job
  where jobname = 'gm-site-insights-daily'
    and schedule = '37 3 * * *'
    and command = 'select public.refresh_site_insights();'
    and active;
  if v_count <> 1 then
    raise exception 'Expected one active daily analytics job, found %', v_count;
  end if;
end;
$$;

insert into public.analytics_events (
  event_name, page_path, language, session_id, target
) values (
  'page_view', '/', 'it',
  '01915f3e-61b0-7e7d-9d1a-0af067b604a8', null
);

set local role authenticated;
select set_config(
  'request.jwt.claims', '{"app_metadata":{"role":"viewer"}}', true
);

do $$
begin
  if exists (select 1 from public.analytics_events) then
    raise exception 'A non-staff authenticated role passed analytics RLS';
  end if;
end;
$$;

select set_config(
  'request.jwt.claims', '{"app_metadata":{"role":"staff"}}', true
);

do $$
begin
  if (select count(*) from public.analytics_events) <> 1 then
    raise exception 'A staff role could not read analytics through RLS';
  end if;
end;
$$;

reset role;
set local role service_role;

do $$
declare
  v_session uuid := '11915f3e-61b0-7e7d-9d1a-0af067b604a8';
  v_first bigint;
  v_duplicate bigint;
begin
  v_first := public.record_site_event(
    'page_view', '/assessment', 'it', v_session, null
  );
  v_duplicate := public.record_site_event(
    'page_view', '/assessment', 'it', v_session, null
  );
  if v_first is null or v_duplicate <> v_first then
    raise exception 'Page-view duplicate suppression failed';
  end if;

  if public.record_site_event(
    'lead_submit', '/assessment', 'it', v_session, 'assessment'
  ) is null then
    raise exception 'Validated lead submission failed';
  end if;

  begin
    perform public.record_site_event(
      'page_view', '/?email=user@example.invalid', 'it', v_session, null
    );
    raise exception 'A query string was accepted';
  exception
    when invalid_parameter_value then null;
  end;

  begin
    perform public.record_site_event(
      'lead_submit', '/assessment', 'it', v_session, 'insights'
    );
    raise exception 'An invalid conversion target was accepted';
  exception
    when invalid_parameter_value then null;
  end;

  begin
    perform public.record_site_event(
      'lead_submit', '/assessment', 'it', v_session, null
    );
    raise exception 'A conversion without a target was accepted';
  exception
    when invalid_parameter_value then null;
  end;
end;
$$;

reset role;

-- Qualified traffic comparison: 50 previous views versus 25 current views.
insert into public.analytics_events (
  event_name, page_path, language, session_id, target, occurred_at
)
select
  'page_view',
  '/insights/iso-37001-37301-dlgs-231-architettura-integrata',
  'it',
  md5('traffic-comparison-' || sample.n)::uuid,
  null,
  (date '2000-01-01' + ((sample.n - 1) % 7))::timestamp at time zone 'UTC'
from generate_series(1, 50) as sample(n);

insert into public.analytics_events (
  event_name, page_path, language, session_id, target, occurred_at
)
select
  'page_view',
  '/insights/iso-37001-37301-dlgs-231-architettura-integrata',
  'it',
  md5('traffic-current-' || sample.n)::uuid,
  null,
  (date '2000-01-08' + ((sample.n - 1) % 7))::timestamp at time zone 'UTC'
from generate_series(1, 25) as sample(n);

-- Below-threshold traffic comparison: only 19 previous views.
insert into public.analytics_events (
  event_name, page_path, language, session_id, target, occurred_at
)
select
  'page_view', '/metodo', 'it',
  md5('threshold-comparison-' || sample.n)::uuid, null,
  (date '2000-01-01' + ((sample.n - 1) % 7))::timestamp at time zone 'UTC'
from generate_series(1, 19) as sample(n);

insert into public.analytics_events (
  event_name, page_path, language, session_id, target, occurred_at
)
select
  'page_view', '/metodo', 'it',
  md5('threshold-current-' || sample.n)::uuid, null,
  (date '2000-01-08' + ((sample.n - 1) % 7))::timestamp at time zone 'UTC'
from generate_series(1, 30) as sample(n);

-- Sitewide conversion comparison: 10/100 versus 4/100 before the other
-- allowlisted page views are included in the shared denominator.
insert into public.analytics_events (
  event_name, page_path, language, session_id, target, occurred_at
)
select
  'page_view', '/', 'it',
  md5('conversion-comparison-view-' || sample.n)::uuid, null,
  (date '2000-01-01' + ((sample.n - 1) % 7))::timestamp at time zone 'UTC'
from generate_series(1, 100) as sample(n);

insert into public.analytics_events (
  event_name, page_path, language, session_id, target, occurred_at
)
select
  'lead_submit', '/assessment', 'it',
  md5('conversion-comparison-lead-' || sample.n)::uuid, 'assessment',
  (date '2000-01-01' + ((sample.n - 1) % 7))::timestamp at time zone 'UTC'
from generate_series(1, 10) as sample(n);

insert into public.analytics_events (
  event_name, page_path, language, session_id, target, occurred_at
)
select
  'page_view', '/', 'it',
  md5('conversion-current-view-' || sample.n)::uuid, null,
  (date '2000-01-08' + ((sample.n - 1) % 7))::timestamp at time zone 'UTC'
from generate_series(1, 100) as sample(n);

insert into public.analytics_events (
  event_name, page_path, language, session_id, target, occurred_at
)
select
  'lead_submit', '/assessment', 'it',
  md5('conversion-current-lead-' || sample.n)::uuid, 'assessment',
  (date '2000-01-08' + ((sample.n - 1) % 7))::timestamp at time zone 'UTC'
from generate_series(1, 4) as sample(n);

select * from public.refresh_site_insights(date '2000-01-15');

do $$
declare
  v_delta numeric;
  v_observed numeric;
  v_comparison numeric;
begin
  if (
    select count(*) from public.site_insights
    where period_end = date '2000-01-14'
  ) <> 2 then
    raise exception 'Expected exactly two sample-gated insights';
  end if;

  select delta_ratio, observed_value, comparison_value
  into v_delta, v_observed, v_comparison
  from public.site_insights
  where insight_key = 'traffic_change'
    and scope_path = '/insights/iso-37001-37301-dlgs-231-architettura-integrata'
    and period_end = date '2000-01-14';
  if v_delta <> -0.5 or v_observed <> 25 or v_comparison <> 50 then
    raise exception 'Unexpected traffic insight values';
  end if;

  if exists (
    select 1 from public.site_insights
    where insight_key = 'traffic_change' and scope_path = '/metodo'
  ) then
    raise exception 'The minimum traffic sample threshold was bypassed';
  end if;

  select delta_ratio into v_delta
  from public.site_insights
  where insight_key = 'conversion_rate_drop'
    and scope_path is null
    and period_end = date '2000-01-14';
  if v_delta > -0.30 then
    raise exception 'The qualified conversion decline was not generated';
  end if;

  if exists (
    select 1 from public.site_insights
    where interpretation not like '%non una prova di causalità%'
  ) then
    raise exception 'An insight omitted the non-causation statement';
  end if;
end;
$$;

-- Re-running the same period must replace output, never duplicate it.
select * from public.refresh_site_insights(date '2000-01-15');

do $$
begin
  if (
    select count(*) from public.site_insights
    where period_end = date '2000-01-14'
  ) <> 2 then
    raise exception 'The daily refresh is not idempotent';
  end if;
end;
$$;

rollback to savepoint gm_site_insights_test_data;
