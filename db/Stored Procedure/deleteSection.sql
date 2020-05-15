CREATE DEFINER=`root`@`%` PROCEDURE `deleteSection`(IN v_section_id INT)
BEGIN
	START TRANSACTION;
    DELETE FROM forum_section
    WHERE forum_section_id = v_section_id;    
    COMMIT;
END