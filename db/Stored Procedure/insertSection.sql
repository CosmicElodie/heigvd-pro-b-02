CREATE DEFINER=`root`@`%` PROCEDURE `insertSection`(IN v_name varchar(45), IN v_description mediumtext,
                                               IN v_parent_forum_section_id int, IN v_house_id int, IN v_help boolean)
BEGIN
    START TRANSACTION ;
	INSERT INTO forum_section (name, description, parent_forum_section_id, house_id, help_section) VALUES
    (v_name, v_description, v_parent_forum_section_id, v_house_id, v_help);

    SELECT JSON_OBJECT(
        'forum_section_id',  forum_section_id,
        'name', name,
        'description', description,
        'parent_forum_section_id', parent_forum_section_id,
        'house',  getHouseJSON(house_id),
        'access_level', access_level,
        'help_section', help_section
    ) as result FROM forum_section WHERE forum_section_id = LAST_INSERT_ID();
    COMMIT;
END