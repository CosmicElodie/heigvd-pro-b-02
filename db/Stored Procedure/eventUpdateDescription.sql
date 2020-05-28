CREATE DEFINER=`root`@`%` PROCEDURE `updateEventDescription`(IN v_event_id int,
											IN v_description mediumtext CHARACTER SET utf8mb4)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET description = v_description
    WHERE event_id = v_event_id;
    COMMIT;
END