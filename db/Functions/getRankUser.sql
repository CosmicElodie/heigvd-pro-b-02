CREATE DEFINER=`root`@`%` FUNCTION `getRankUser`(v_user_id INT) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE n_rank INT;
	SELECT RANK() OVER (ORDER BY getPointsUser(user_id) ASC) user_rank INTO n_rank
    FROM user
    WHERE user_id = v_user_id;
	RETURN n_rank;
END