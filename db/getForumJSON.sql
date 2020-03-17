CREATE DEFINER=`root`@`localhost` FUNCTION `getForumJSON`(v_idForum INT) RETURNS json
    DETERMINISTIC
BEGIN

RETURN (SELECT JSON_OBJECT(
        'id_forum_section', id_forum_section, 
        'name', name, 
        'description', description, 
        'parent_id_forum_section', parent_id_forum_section )
    FROM forum_section
    WHERE id_forum_section = v_idForum);
END