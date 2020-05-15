CREATE DEFINER=`root`@`%` PROCEDURE `updateSubject`(IN v_name varchar(100), IN v_subject_id int)
BEGIN
    START TRANSACTION ;
    UPDATE forum_subject
    SET name = v_name
    WHERE forum_subject_id = v_subject_id;
    COMMIT;
END