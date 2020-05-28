CREATE DEFINER=`root`@`%` FUNCTION `getParticipantsEvent`(v_event_id INT, v_participation_mode VARCHAR(10)) RETURNS json
    DETERMINISTIC
BEGIN

	IF v_participation_mode = "user" THEN
		RETURN (SELECT json_arrayagg(getUserJSON(user_id)) FROM user_participate_event
				WHERE event_id = v_event_id);
	ELSE
		RETURN (SELECT json_arrayagg(participant) from (SELECT getHouseDetailJSON(house.house_id) as participant
				FROM house 
				INNER JOIN user USING(house_id) 
				INNER JOIN user_participate_event USING(user_id)
				WHERE event_id = v_event_id
				GROUP BY house.house_id) as participants);
	END IF;
END