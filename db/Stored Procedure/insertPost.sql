CREATE DEFINER=`root`@`%` PROCEDURE `insertPost`(IN v_message longtext, IN v_forum_subject_id int, IN v_user_id int)
BEGIN
	START TRANSACTION;
		INSERT INTO forum_post (message, created, last_update, forum_subject_id, user_id)
		VALUES (v_message, NOW(), NOW(), v_forum_subject_id, v_user_id);
        SELECT JSON_OBJECT(
        'forum_post_id', forum_post_id,
        'message', message,
        'created', created,
        'last_update', last_update,
        'forum_subject_id', forum_subject_id,
        'creator',  getUserJSON(user_id)
    ) as result FROM forum_post WHERE forum_post_id = LAST_INSERT_ID();
    COMMIT;
	
END