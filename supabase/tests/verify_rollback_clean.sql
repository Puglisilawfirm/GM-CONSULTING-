-- Run in a fresh database session after the migration dry-run rolled back.

do $$
declare
  v_job_count integer := 0;
begin
  if to_regclass('public.analytics_allowed_paths') is not null
     or to_regclass('public.analytics_events') is not null
     or to_regclass('public.analytics_daily_metrics') is not null
     or to_regclass('public.site_insights') is not null then
    raise exception 'One or more analytics tables survived rollback';
  end if;

  if to_regprocedure('public.is_analytics_staff()') is not null
     or to_regprocedure(
       'public.record_site_event(text,text,text,uuid,text)'
     ) is not null
     or to_regprocedure('public.refresh_site_insights(date)') is not null then
    raise exception 'One or more analytics functions survived rollback';
  end if;

  if to_regclass('cron.job') is not null then
    select count(*) into v_job_count
    from cron.job
    where jobname = 'gm-site-insights-daily';
  end if;
  if v_job_count <> 0 then
    raise exception 'The analytics cron job survived rollback';
  end if;
end;
$$;

select 'rollback-clean' as verification_result;
