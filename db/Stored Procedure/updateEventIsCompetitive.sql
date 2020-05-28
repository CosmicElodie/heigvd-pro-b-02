CREATE DEFINER=`root`@`%` PROCEDURE `updateEventIsCompetitive`(IN v_event_id int,
											IN v_is_competitive int)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET is_competitive = v_is_competitive
    WHERE event_id = v_event_id;
    COMMIT;
END