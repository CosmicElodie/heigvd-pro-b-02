CREATE DEFINER=`root`@`%` PROCEDURE `updateSection`(IN v_name varchar(100), IN v_description mediumtext, IN v_section_id int)
BEGIN
    START TRANSACTION ;
    UPDATE forum_section
    SET name = v_name, description = v_description
    WHERE forum_section_id = v_section_id;

    COMMIT;
END