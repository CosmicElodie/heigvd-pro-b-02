CREATE DEFINER=`root`@`%` FUNCTION `getForums`(v_access_level INT, v_house_id INT) RETURNS json
    DETERMINISTIC
proc:BEGIN
    # Appel vers la procedure stockée recursive listForumsByParent
    # premier argument null signifie que pour la première récursion on cherche les forums racines
    # output passé comme parametre interposé, manière a récuperé le JSON construit par la pile d'appels récursifs
    DECLARE output JSON; 
    SET max_sp_recursion_depth=255;
    CALL listForumsByParent(null,v_access_level, v_house_id, output);
RETURN output;
END