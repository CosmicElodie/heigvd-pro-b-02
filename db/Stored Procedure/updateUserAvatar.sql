CREATE DEFINER=`root`@`%` PROCEDURE `updateUserAvatar`(IN v_user_id int, IN v_avatar mediumtext)
BEGIN
	START TRANSACTION ;
    UPDATE user
    SET avatar = v_avatar
    WHERE user_id = v_user_id;
    COMMIT;
END