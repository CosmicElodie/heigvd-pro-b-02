CREATE DEFINER=`root`@`%` FUNCTION `getUpcomingEventJSON`() RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (SELECT json_arrayagg(getDetailEventJson(event_id)) as result
		FROM event
		WHERE status = "En cours" OR status = "En attente"
		ORDER BY date_begin ASC);
END