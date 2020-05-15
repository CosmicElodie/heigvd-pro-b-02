CREATE DEFINER=`root`@`%` PROCEDURE `updateUserPassword`(IN v_user_id int, IN v_password varchar(255))
BEGIN
	START TRANSACTION ;
    UPDATE user
    SET password = v_password
    WHERE user_id = v_user_id;
    COMMIT;
END