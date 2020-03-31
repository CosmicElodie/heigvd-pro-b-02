CREATE DEFINER=`root`@`localhost` PROCEDURE `insertSection`(IN v_name VARCHAR(45), IN v_description mediumtext, IN v_parent_forum_section_id INT, IN v_house_id INT)
BEGIN
	INSERT INTO forum_section (name, description, parent_forum_section_id, house_id) VALUES
    (v_name, v_description, v_parent_forum_section_id, v_house_id);
END