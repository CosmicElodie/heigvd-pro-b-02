CREATE DEFINER=`root`@`%` PROCEDURE `unanswerPost`(IN v_post_id INT)
BEGIN
	UPDATE forum_post SET subject_answer = 0 WHERE forum_post_id = v_post_id;
END