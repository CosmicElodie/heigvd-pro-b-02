CREATE DEFINER=`root`@`%` PROCEDURE `insertPointsFromEvent`(IN v_event_id INT, IN v_user_id int, IN v_points int)
BEGIN
	INSERT INTO points_log (points, origin, date, user_id, event_id) VALUES 
    (v_points, "event_solo_won", NOW(), v_user_id, v_event_id);
END