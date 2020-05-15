CREATE DEFINER=`root`@`%` PROCEDURE `insertPointsBasedFromEvent`(IN v_event_id INT)
BEGIN
	INSERT INTO points_log (points, origin, date, user_id, event_id)
    SELECT  5, "event_participation", NOW(), user.user_id, v_event_id
    FROM    user
    INNER JOIN user_participate_event USING (user_id)
    WHERE   user_participate_event.event_id = v_event_id;
END