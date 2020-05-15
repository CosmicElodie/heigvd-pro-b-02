CREATE DEFINER=`root`@`%` PROCEDURE `quitEvent`(v_user_id int, v_event_id int)
BEGIN
	DELETE FROM user_participate_event
    WHERE event_id = v_event_id AND user_id = v_user_id;
END