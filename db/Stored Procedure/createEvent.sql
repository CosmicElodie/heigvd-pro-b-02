CREATE DEFINER=`root`@`%` PROCEDURE `createEvent`(IN v_name varchar(45),
                                             IN v_description mediumtext,
                                             IN v_is_competitive int,
                                             IN v_battleroyale int,
                                             IN v_difficulty int,
                                             IN v_price int,
                                             IN v_attendees_min int,
                                             IN v_attendees_max int,
                                             IN v_deadline_reservation datetime,
                                             IN v_date_begin datetime,
                                             IN v_date_end datetime,
                                             IN v_location mediumtext,
                                             IN v_address varchar(256),
                                             IN v_user_id int,
                                             IN v_house_id int)
BEGIN
    START TRANSACTION ;
    INSERT INTO event(name, description, is_competitive, battleroyale, difficulty, price, attendees_min, attendees_max, deadline_reservation, created, date_begin, date_end, location, address, user_id, house_id) VALUES
                     (v_name, v_description, v_is_competitive, v_battleroyale, v_difficulty, v_price, v_attendees_min, v_attendees_max, v_deadline_reservation, NOW(), v_date_begin, v_date_end, v_location, v_address, v_user_id, v_house_id);

    SELECT JSON_OBJECT(
            'event_id', events.event_id,
            'name', events.name,
            'description', events.description,
            'is_competitive', events.is_competitive,
            'difficulty', events.difficulty,
            'battleroyale', events.battleroyale,
            'status', events.status,
            'price', events.price,
            'attendees_min', events.attendees_min,
            'attendees_max', events.attendees_max,
            'created',events.created,
            'deadline_reservation', events.deadline_reservation,
            'date_begin', events.date_begin,
            'date_end', events.date_end,
            'location', events.location,
            'address', events.address,
            'house_id', events.house_id,
            'house_name', events.house_name,
			'organisator', getUserJSON(user_id),
            'participants', getParticipantsEvent(event_id),
            'nb_attendees', nb_attendees) as result
            FROM (SELECT event.*, house.name as house_name, count(user_participate_event.user_id) as nb_attendees
                  FROM event
                           LEFT JOIN house USING(house_id)
                           LEFT join user_participate_event using(event_id)

                  group by event_id
                 ) as events WHERE event_id = LAST_INSERT_ID();
    COMMIT;
END