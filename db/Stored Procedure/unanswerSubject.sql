CREATE DEFINER=`root`@`%` PROCEDURE `unanswerSubject`(IN v_subject_id INT)
BEGIN
	UPDATE forum_subject SET resolved = 0 WHERE forum_subject_id = v_subject_id;
END