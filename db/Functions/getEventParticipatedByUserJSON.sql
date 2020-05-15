CREATE DEFINER=`root`@`%` FUNCTION `getEventParticipatedByUserJSON`(v_user_id INT) RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (SELECT json_arrayagg(getDetailEventJson(event.event_id)) AS result
	FROM event
	JOIN user_participate_event ON user_participate_event.event_id = event.event_id
	WHERE user_participate_event.user_id = v_user_id AND (status = "En cours" OR status = "En attente"));
END