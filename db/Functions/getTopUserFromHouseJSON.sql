CREATE DEFINER=`root`@`%` FUNCTION `getTopUserFromHouseJSON`(v_house_id INT, v_nb_limit INT) RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (
		SELECT json_arrayagg(getUserJSON(user_id))
		FROM (
			SELECT user_id, house_id, getPointsUser(user_id) AS points
            FROM user
			WHERE house_id = v_house_id
			ORDER BY points DESC
			LIMIT v_nb_limit) AS bestUser
		);
END