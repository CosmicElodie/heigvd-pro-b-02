CREATE DEFINER=`root`@`%` FUNCTION `getPointsUser`(v_user_id INT) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE total_points INT;
	SELECT SUM(points) INTO total_points 
    FROM points_log
	WHERE user_id = v_user_id;
	RETURN total_points;
END