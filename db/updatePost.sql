CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePost`(v_forum_post_id INT, v_message LONGTEXT)
BEGIN
	UPDATE forum_post
    SET message = v_message, last_update = NOW()
    WHERE forum_post_id = v_forum_post_id;
END