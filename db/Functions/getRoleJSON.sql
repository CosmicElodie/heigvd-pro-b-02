CREATE DEFINER=`root`@`%` FUNCTION `getRoleJSON`(v_role_id INT) RETURNS json
    DETERMINISTIC
BEGIN

RETURN 
	(SELECT json_object(
		'role_id', role_id,
        'name', name,
        'priority', priority)
        FROM role
        WHERE role_id = v_role_id);
END