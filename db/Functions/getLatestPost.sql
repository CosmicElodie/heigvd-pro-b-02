CREATE DEFINER=`root`@`%` FUNCTION `getLatestPostJSON`(v_house_id INT, v_nb_limit INT) RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (SELECT json_arrayagg(JSON_OBJECT(
                'forum_post_id', forum_post_id,
                'message', message,
                'created', forum_post.created,
                'last_update', last_update,
                'subject_answer', subject_answer,
                'creator', getUserJSON(user_id))) as result
         FROM forum_post
         JOIN user USING(user_id)
         WHERE house_id = v_house_id
         ORDER BY forum_post.created DESC
         LIMIT v_nb_limit);
END