CREATE DEFINER=`root`@`%` FUNCTION `getSubjectsJSON`(v_forum_section_id int) RETURNS json
    DETERMINISTIC
BEGIN

    RETURN
        (SELECT JSON_arrayagg(subject) FROM (SELECT JSON_object(
			'forum_subject_id', forum_subject_id,
			'name', name,
			'created', forum_subject.created,
			'forum_section_id', forum_section_id,
			'resolved', resolved,
			'creator', getUserJSON(forum_subject.user_id)
			,'posts', getPostsJSON(forum_subject_id)
			) as subject
		 FROM forum_subject
		 LEFT JOIN (
			 SELECT MAX(created) as last_post, forum_subject_id
			 FROM forum_post GROUP BY forum_subject_id
		 ) as posts using (forum_subject_id)
		 WHERE forum_section_id = v_forum_section_id
		 ORDER BY COALESCE(last_post, created) DESC) as subjects);
END