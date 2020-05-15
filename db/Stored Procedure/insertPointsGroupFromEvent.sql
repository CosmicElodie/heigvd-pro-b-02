CREATE DEFINER=`root`@`%` PROCEDURE `insertPointsGroupFromEvent`(IN v_event_id INT, IN v_points int, IN v_house_id INT)
BEGIN
	INSERT INTO points_log (points, origin, date, user_id, event_id)
    SELECT  v_points, "event_group_won", NOW() ,user.user_id, v_event_id
    FROM    user
    WHERE   user.house_id = v_house_id;
END