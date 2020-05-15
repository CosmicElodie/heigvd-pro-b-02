CREATE DEFINER=`root`@`%` FUNCTION `getPointsHouse`(v_house_id INT) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE total_points INT;
	SELECT SUM(getPointsUser(user_id)) INTO total_points
	FROM house
    JOIN user USING(house_id)
    WHERE house_id = v_house_id;
	RETURN total_points;
END