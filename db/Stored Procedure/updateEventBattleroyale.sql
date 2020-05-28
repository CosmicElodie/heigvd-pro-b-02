CREATE DEFINER=`root`@`%` PROCEDURE `updateEventBattleroyale`(IN v_event_id int,
											IN v_battleroyale int)
BEGIN
	START TRANSACTION;
    UPDATE event
    SET battleroyale = v_battleroyale
    WHERE event_id = v_event_id;
    COMMIT;
END