CREATE DEFINER=`root`@`%` PROCEDURE `joinEvent`(v_user_id int, v_event_id int)
BEGIN
	INSERT INTO user_participate_event (user_id, event_id)
		VALUES (v_user_id, v_event_id);
END