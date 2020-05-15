CREATE DEFINER=`root`@`%` PROCEDURE `deleteSubject`(IN v_subject_id INT)
BEGIN
	START TRANSACTION;
    DELETE FROM forum_subject
    WHERE forum_subject_id = v_subject_id;    
    COMMIT;
END