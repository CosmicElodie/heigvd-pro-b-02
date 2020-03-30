SELECT json_arrayagg(json_object(
	'forum_post_id', forum_post_id,
    'message', message,
    'created', created,
    'last_update', last_update,
    'forum_subject_id', forum_subject_id,
    'user_id', user_id)) AS Result FROM forum_post