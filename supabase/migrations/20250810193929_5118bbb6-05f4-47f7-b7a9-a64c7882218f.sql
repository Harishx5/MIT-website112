-- Create function to handle smart display order swapping
CREATE OR REPLACE FUNCTION public.swap_service_display_order(
  service_id UUID,
  new_display_order INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  current_display_order INTEGER;
  target_service_id UUID;
BEGIN
  -- Get current display order of the service being moved
  SELECT display_order INTO current_display_order
  FROM services 
  WHERE id = service_id;
  
  -- If new order is same as current, do nothing
  IF current_display_order = new_display_order THEN
    RETURN;
  END IF;
  
  -- Find the service currently at the target position
  SELECT id INTO target_service_id
  FROM services 
  WHERE display_order = new_display_order
  AND id != service_id
  LIMIT 1;
  
  -- If there's a service at the target position, swap them
  IF target_service_id IS NOT NULL THEN
    -- Move target service to the current service's position
    UPDATE services 
    SET display_order = current_display_order
    WHERE id = target_service_id;
  END IF;
  
  -- Move the current service to the new position
  UPDATE services 
  SET display_order = new_display_order
  WHERE id = service_id;
END;
$$;