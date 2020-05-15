CREATE DEFINER=`root`@`%` FUNCTION `getUserTopN`(Nth INT) RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (SELECT json_arrayagg(getUserJSON(user_id))
	FROM user
	ORDER BY getPointsUser(user_id) DESC
    LIMIT Nth);
END