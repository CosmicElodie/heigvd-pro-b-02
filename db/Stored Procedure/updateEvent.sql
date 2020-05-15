CREATE DEFINER=`root`@`%` PROCEDURE `updateEvent`(IN v_event_id int,
								IN v_name varchar(45),
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
								IN v_house_id int)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET name = v_name,
		description = v_description,
		is_competitive = v_is_competitive,
		difficulty = v_difficulty,
		battleroyale = v_battleroyale,
		status = v_status,
		price = v_price,
		attendees_min = v_attendees_min,
		attendees_max = v_attendees_max,
		created = v_created,
		deadline_reservation = v_deadline_reservation,
		date_begin = v_date_begin,
		date_end = v_date_end,
		location = v_location,
		address = v_address,
		house_id = v_house_id
    WHERE event_id = v_event_id;
    COMMIT;
END