CREATE DEFINER=`root`@`%` FUNCTION `getNbPostPerUser`(v_user_id int) RETURNS int
    DETERMINISTIC
BEGIN
	DECLARE total_post int;
	SELECT COUNT(forum_post_id) INTO total_post
	FROM post
	WHERE user_id = v_user_id;
	RETURN total_post;
END