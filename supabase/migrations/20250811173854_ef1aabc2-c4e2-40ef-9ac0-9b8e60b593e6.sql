-- Update increment_view_count function to handle news table
CREATE OR REPLACE FUNCTION public.increment_view_count(table_name text, record_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  CASE table_name
    WHEN 'blogs' THEN
      UPDATE public.blogs SET view_count = view_count + 1 WHERE id = record_id;
    WHEN 'portfolio_projects' THEN
      UPDATE public.portfolio_projects SET view_count = view_count + 1 WHERE id = record_id;
    WHEN 'faqs' THEN
      UPDATE public.faqs SET view_count = view_count + 1 WHERE id = record_id;
    WHEN 'news' THEN
      UPDATE public.news SET view_count = view_count + 1 WHERE id = record_id;
    ELSE
      RAISE EXCEPTION 'Invalid table name: %', table_name;
  END CASE;
END;
$function$;