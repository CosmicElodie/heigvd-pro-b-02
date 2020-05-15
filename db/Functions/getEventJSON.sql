CREATE DEFINER=`root`@`localhost` FUNCTION `getEventJSON`( v_nb_limit int) RETURNS json
    DETERMINISTIC
BEGIN
    IF v_nb_limit > 0 THEN
        RETURN (SELECT json_arrayagg(JSON_OBJECT(
                'event_id', events.event_id,
                'name', events.name,
                'description', events.description,
                'is_competitve', events.is_competitive,
                'battleroyale', battleroyale,
                'difficulty', events.difficulty,
                'status', events.status,
                'price', events.price,
                'deadline_reservation', events.deadline_reservation,
                'date_begin', events.date_begin,
                'date_end', events.date_end,
                'location', events.location,
                'house_id', events.house_id,
                'house_name', events.house_name,
                'organisator', getUserJSON(events.user_id),
                'attendees_min', attendees_min,
                'attendees_max', attendees_max,
                'nb_attendees', nb_attendees)) AS result
                FROM (SELECT event.*, house.name AS house_name, COUNT(user_participate_event.user_id) AS nb_attendees
                      FROM event
                               LEFT JOIN house USING(house_id)
                               INNER JOIN user_participate_event using(event_id)
                      GROUP BY event_id
                     ) AS events
                WHERE events.status = 'En cours' OR events.status = 'En attente'
                ORDER BY date_begin ASC LIMIT v_nb_limit);
    ELSE
        RETURN (SELECT json_arrayagg(JSON_OBJECT(
                'event_id', events.event_id,
                'name', events.name,
                'description', events.description,
                'is_competitve', events.is_competitive,
                'battleroyale', battleroyale,
                'difficulty', events.difficulty,
                'status', events.status,
                'price', events.price,
                'deadline_reservation', events.deadline_reservation,
                'date_begin', events.date_begin,
                'date_end', events.date_end,
                'location', events.location,
                'house_id', events.house_id,
                'house_name', events.house_name,
                'organisator', getUserJSON(events.user_id),
                'attendees_min', attendees_min,
                'attendees_max', attendees_max,
                'nb_attendees', nb_attendees)) AS result
                FROM (SELECT event.*, house.name AS house_name, COUNT(user_participate_event.user_id) AS nb_attendees
                      FROM event
                               LEFT JOIN house USING(house_id)
                               INNER JOIN user_participate_event using(event_id)
                      GROUP BY event_id
                     ) AS events
                WHERE events.status = 'En cours' OR events.status = 'En attente'
                ORDER BY date_begin ASC);
    END IF;
END