CREATE DEFINER=`root`@`%` PROCEDURE `answerSubject`(IN v_subject_id INT)
BEGIN
	UPDATE forum_subject SET resolved = 1 WHERE forum_subject_id = v_subject_id;
END