CREATE DEFINER=`root`@`%` PROCEDURE `updateEventName`(IN v_event_id int,
											IN v_name varchar(45) CHARACTER SET utf8mb4)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET name = v_name
    WHERE event_id = v_event_id;
    COMMIT;
END