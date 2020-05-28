CREATE DEFINER=`root`@`%` PROCEDURE `updateEventAttendeesMin`(IN v_event_id int,
											IN v_attendees_min int)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET attendees_min = v_attendees_min
    WHERE event_id = v_event_id;
    COMMIT;
END