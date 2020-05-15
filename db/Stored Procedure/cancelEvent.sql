CREATE DEFINER=`root`@`%` PROCEDURE `cancelEvent`(v_event_id INT)
BEGIN
	START TRANSACTION;

    DELETE FROM user_participate_event
    WHERE event_id = v_event_id;

    UPDATE event
    SET status = "annule"
    WHERE event_id = v_event_id;

    COMMIT;
END