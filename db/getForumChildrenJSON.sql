CREATE DEFINER=`root`@`localhost` FUNCTION `getForumChildrenJSON`(v_id_parent INT) RETURNS json
    DETERMINISTIC
BEGIN

RETURN (SELECT CONCAT("[", GROUP_CONCAT(JSON_OBJECT( 
        'id_forum_section', id_forum_section, 
        'name', name, 
        'description', description, 
        'parent_id_forum_section', parent_id_forum_section )), "]")
    FROM forum_section
    WHERE parent_id_forum_section = v_id_parent);
END