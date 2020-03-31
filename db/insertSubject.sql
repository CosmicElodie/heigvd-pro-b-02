CREATE DEFINER=`root`@`localhost` PROCEDURE `insertSubject`(v_name VARCHAR(100), v_forum_section_id INT, v_user_id INT, v_message LONGTEXT)
BEGIN
	declare w_forum_subject_id INT;
    START TRANSACTION; 
		INSERT INTO forum_subject (name, created, forum_section_id, user_id) VALUES
		(v_name, NOW(), v_forum_section_id, v_user_id);
		SELECT max(forum_subject_id) INTO w_forum_subject_id
		FROM forum_subject;
		CALL insertPost(v_message, w_forum_subject_id, v_user_id);
	COMMIT;
END