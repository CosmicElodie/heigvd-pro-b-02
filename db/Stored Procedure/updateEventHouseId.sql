CREATE DEFINER=`root`@`%` PROCEDURE `updateEventHouseId`(IN v_event_id int,
											IN v_house_id int)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET house_id = v_house_id
    WHERE event_id = v_event_id;
    COMMIT;
END