CREATE DEFINER=`root`@`%` FUNCTION `getEventCreatedByUserJSON`(v_user_id INT) RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (SELECT json_arrayagg(getDetailEventJson(event.event_id)) AS result
		FROM event
		WHERE user_id = v_user_id
		ORDER BY date_begin ASC);
END