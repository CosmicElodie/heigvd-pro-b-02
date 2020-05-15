CREATE DEFINER=`root`@`%` FUNCTION `getStatusJSON`(v_status_id INT) RETURNS json
    DETERMINISTIC
BEGIN

RETURN 
	(SELECT json_object(
		'status_id', status_id,
        'name', name)
        FROM status
        WHERE status_id = v_status_id);
END