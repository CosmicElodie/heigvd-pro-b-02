CREATE DEFINER=`root`@`%` PROCEDURE `updateEventDateBegin`(IN v_event_id int,
											IN v_date_begin datetime)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET date_begin = v_date_begin
    WHERE event_id = v_event_id;
    COMMIT;
END