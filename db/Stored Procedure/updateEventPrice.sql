CREATE DEFINER=`root`@`%` PROCEDURE `updateEventPrice`(IN v_event_id int,
											IN v_price double)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET price = v_price
    WHERE event_id = v_event_id;
    COMMIT;
END