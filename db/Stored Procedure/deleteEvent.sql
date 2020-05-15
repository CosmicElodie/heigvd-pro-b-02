CREATE DEFINER=`root`@`%` PROCEDURE `deleteEvent`(IN v_event_id int)
BEGIN
    START TRANSACTION;

    DELETE FROM user_participate_event
    WHERE event_id = v_event_id;

    DELETE FROM event
    WHERE event_id = v_event_id;

    COMMIT;
END