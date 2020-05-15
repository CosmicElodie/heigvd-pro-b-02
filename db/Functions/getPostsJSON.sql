CREATE DEFINER=`root`@`%` FUNCTION `getPostsJSON`(v_forum_subject_id int) RETURNS json
    DETERMINISTIC
BEGIN

    RETURN
        (SELECT JSON_arrayagg(post) FROM (SELECT JSON_object(
                'forum_post_id', forum_post_id,
                'message', message,
                'created', created,
                'last_update',last_update,
                'subject_answer',subject_answer,
                'creator', getUserJSON(user_id)) as post
         FROM forum_post
         WHERE forum_subject_id = v_forum_subject_id
         ORDER BY subject_answer DESC, created DESC) as posts);
END