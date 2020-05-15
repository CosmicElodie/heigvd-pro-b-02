CREATE DEFINER=`root`@`%` FUNCTION `getEventFromHouseJSON`(v_house_id INT, v_nb_limit INT) RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (SELECT json_arrayagg(getDetailEventJson(event.event_id)) AS result
		FROM event
		WHERE house_id = v_house_id AND status = "En cours" OR status = "En attente"
		ORDER BY date_begin ASC
        LIMIT v_nb_limit);
END