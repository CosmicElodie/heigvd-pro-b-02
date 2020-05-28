CREATE DEFINER=`root`@`%` PROCEDURE `updateEventDeadlineReservation`(IN v_event_id int,
											IN v_deadline_reservation datetime)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET deadline_reservation = v_deadline_reservation
    WHERE event_id = v_event_id;
    COMMIT;
END