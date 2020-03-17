CREATE DEFINER=`root`@`localhost` PROCEDURE `listForum`()
proc: BEGIN
	DECLARE v_forums_root JSON DEFAULT
    (SELECT CONCAT("[", GROUP_CONCAT(getForumJSON(id_forum_Section)), "]")
    FROM forum_section
    WHERE parent_id_forum_section IS NULL);
    
    DECLARE v_number_forums INT DEFAULT JSON_LENGTH(v_forums_root);
    DECLARE v_i INT DEFAULT 0;
    DECLARE v_forum_children JSON;
    
    
    WHILE v_i < v_number_forums DO
        
        WHILE JSON_LENGTH(getForumChildrenJSON(
			SELECT JSON_EXTRACT(v_forums_root, CONCAT('$[',v_i,'].id_forum_section')))) > 0 DO
        
        END WHILE;
        
        LEAVE proc;
        -- IF JSON_UNQUOTE(JSON_EXTRACT(v_player_row, '$.owner')) = 1 THEN
           -- SET v_owner_id = JSON_UNQUOTE(JSON_EXTRACT(v_player_row, '$.id'));
        -- END IF;
        
        SET v_i = v_i + 1;
    END WHILE;
    
    SELECT v_forums_root;
    
END