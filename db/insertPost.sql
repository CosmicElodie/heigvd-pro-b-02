CREATE DEFINER=`root`@`localhost` PROCEDURE `insertPost`(v_message LONGTEXT, v_forum_subject_id INT, v_user_id INT)
BEGIN
	INSERT INTO forum_post (message, created, last_update, forum_subject_id, user_id)
    VALUES (v_message, NOW(), NOW(), v_forum_subject_id, v_user_id);
END