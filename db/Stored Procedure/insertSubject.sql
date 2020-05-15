CREATE DEFINER=`root`@`%` PROCEDURE `insertSubject`(v_name VARCHAR(100), v_forum_section_id INT, v_user_id INT)
BEGIN
	START TRANSACTION;
		INSERT INTO forum_subject (name, created, forum_section_id, user_id) VALUES
        (v_name, now(), v_forum_section_id, v_user_id);
        SELECT JSON_OBJECT(
        'forum_subject_id',  forum_subject_id,
        'name', name,
        'created', created,
        'forum_section_id', forum_section_id,
        'creator',  getUserJSON(user_id)
    ) as result FROM forum_subject WHERE forum_subject_id = LAST_INSERT_ID();
    COMMIT;
END