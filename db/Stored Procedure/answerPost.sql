CREATE DEFINER=`root`@`%` PROCEDURE `answerPost`(IN v_post_id INT)
BEGIN
	UPDATE forum_post SET subject_answer = 1 WHERE forum_post_id = v_post_id;
END