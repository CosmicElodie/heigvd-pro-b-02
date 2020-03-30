SELECT json_arrayagg(json_object(
	'forum_subject_id', id_forum_subject,
    'name', name,
    'created', created,
    'forum_section_id', id_forum_section,
    'user_id', user_id)) as result from forum_subject