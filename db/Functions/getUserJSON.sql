CREATE DEFINER=`root`@`%` FUNCTION `getUserJSON`(v_user_id int) RETURNS json
    DETERMINISTIC
BEGIN

    RETURN (SELECT json_object(
			   'user_id', user_id,
			   'active', active,
			   'birth', (SELECT DATE_FORMAT(birth, "%d %M %Y")),
			   'created', created,
			   'email', email,
			   'firstname', firstname,
			   'initials', (CONCAT(LEFT(UPPER(firstname), 1), LEFT(UPPER(lastname),1))),
			   'last_online', last_online,
			   'lastname', lastname,
			   'status', getStatusJSON(status_id),
			   'avatar', avatar,
			   'access_level', access_level,
               'points', getPointsUser(user_id),
			   'house', getHouseJSON(house_id))
            FROM user
            WHERE user_id = v_user_id
            LIMIT 1);
END