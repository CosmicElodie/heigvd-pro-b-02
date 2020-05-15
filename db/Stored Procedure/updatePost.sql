CREATE DEFINER=`root`@`%` PROCEDURE `updatePost`(IN v_message varchar(45), IN v_post_id int)
BEGIN
    START TRANSACTION ;
    UPDATE forum_post
    SET message = v_message, last_update = NOW()
    WHERE forum_post_id = v_post_id;
    COMMIT;
END