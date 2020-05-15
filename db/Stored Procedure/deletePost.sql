CREATE DEFINER=`root`@`%` PROCEDURE `deletePost`(IN v_post_id INT)
BEGIN
	START TRANSACTION;
    DELETE FROM forum_post
    WHERE forum_post_id = v_post_id;    
    COMMIT;
END
