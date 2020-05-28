CREATE DEFINER=`root`@`%` PROCEDURE `updateEventAttendeesMax`(IN v_event_id int,
											IN v_attendees_max int)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET attendees_max = v_attendees_max
    WHERE event_id = v_event_id;
    COMMIT;
END