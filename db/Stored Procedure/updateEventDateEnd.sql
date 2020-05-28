CREATE DEFINER=`root`@`%` PROCEDURE `updateEventDateEnd`(IN v_event_id int,
											IN v_date_end datetime)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET date_end = v_date_end
    WHERE event_id = v_event_id;
    COMMIT;
END