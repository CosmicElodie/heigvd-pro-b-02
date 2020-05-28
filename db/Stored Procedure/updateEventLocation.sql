CREATE DEFINER=`root`@`%` PROCEDURE `updateEventLocation`(IN v_event_id int,
											IN v_location mediumtext CHARACTER SET utf8mb4)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET location = v_location
    WHERE event_id = v_event_id;
    COMMIT;
END