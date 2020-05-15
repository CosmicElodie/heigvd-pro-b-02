CREATE DEFINER=`root`@`%` FUNCTION `getDetailEventJson`(v_event_id int) RETURNS json
    DETERMINISTIC
BEGIN
    RETURN (SELECT JSON_OBJECT(
            'event_id', event_id,
            'name', name,
            'description', description,
            'is_competitive', is_competitive,
            'difficulty', difficulty,
            'battleroyale', battleroyale,
            'status', status,
            'price', price,
            'attendees_min', attendees_min,
            'attendees_max', attendees_max,
            'created', DATE_FORMAT(created, "%d %M %Y - %H:%i"),
            'deadline_reservation', DATE_FORMAT(deadline_reservation, "%d %M %Y - %H:%i"),
            'date_begin', DATE_FORMAT(date_begin, "%d %M %Y - %H:%i"),
            'date_end', DATE_FORMAT(date_end, "%d %M %Y - %H:%i"),
            'location', location,
            'address', address,
            'house', getHouseJSON(house_id),
			'organisator', getUserJSON(user_id),
            'participants', getParticipantsEvent(event_id),
            'nb_attendees', nb_attendees) AS result
            FROM (SELECT event.*, count(user_participate_event.user_id) as nb_attendees
				FROM event
				LEFT JOIN user_participate_event USING(event_id)
				GROUP BY event_id) AS events 
			WHERE event_id = v_event_id);
END