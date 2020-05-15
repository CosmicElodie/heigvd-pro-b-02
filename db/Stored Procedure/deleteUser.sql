CREATE DEFINER=`root`@`%` PROCEDURE `deleteUser`(IN v_user_id int)
BEGIN
	START TRANSACTION;
    UPDATE user
    SET active = 0
    WHERE user_id = v_user_id;    
    COMMIT;
END