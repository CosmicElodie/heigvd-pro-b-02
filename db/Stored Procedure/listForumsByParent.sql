CREATE DEFINER=`root`@`%` PROCEDURE `listForumsByParent`(IN v_parent_id INT, IN v_access_level INT, IN v_house_id INT, OUT v_out JSON)
proc:BEGIN

        DECLARE v_i INT DEFAULT 0;
        DECLARE v_nb INT DEFAULT 0;
        DECLARE v_current JSON;
        DECLARE current_forum_id INT;

        DECLARE v_forums JSON DEFAULT (SELECT json_arrayagg(JSON_OBJECT(
            'forum_section_id', forum_section_id,
            'name', name,
            'description', description,
            'parent_forum_section_id', parent_forum_section_id,
            'house_id', house_id,
            'access_level', access_level,
            'help_section', help_section,
            'subjects', getSubjectsJSON(forum_section_id)
            ))
            FROM forum_section
            WHERE (((v_parent_id IS NULL AND parent_forum_section_id IS NULL) OR parent_forum_section_id = v_parent_id) 
            AND (v_access_level >= 75 OR (v_access_level >= 50) OR (v_access_level >= access_level AND (house_id = v_house_id OR house_id IS NULL))))

        );

		SET max_sp_recursion_depth=255;
        IF v_out IS NULL THEN
            SET v_out = v_forums;
        END IF;

        SET v_nb = JSON_LENGTH(v_forums);
        IF v_nb > 0 THEN
            REPEAT
                SET current_forum_id = JSON_EXTRACT(v_out, CONCAT("$[", v_i, "].forum_section_id"));
                    SET v_current = NULL;
                    # Appel récursif pour chercher les enfants du forum courant
                    CALL listForumsByParent(current_forum_id, v_access_level, v_house_id, v_current);
                    SET v_out = JSON_INSERT(v_out, CONCAT('$[', v_i, '].forums'), v_current);
                    SET v_current = NULL;
                SET v_i = v_i + 1;
                UNTIL v_i = v_nb
           END REPEAT;
        END IF;
END