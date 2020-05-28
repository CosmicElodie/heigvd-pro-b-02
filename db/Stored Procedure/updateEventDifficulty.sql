CREATE DEFINER=`root`@`%` PROCEDURE `updateEventDifficulty`(IN v_event_id int,
											IN v_difficulty int)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET difficulty = v_difficulty
    WHERE event_id = v_event_id;
    COMMIT;
END