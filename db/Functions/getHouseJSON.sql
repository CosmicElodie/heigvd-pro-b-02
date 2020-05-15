CREATE DEFINER=`root`@`%` FUNCTION `getHouseJSON`(v_house_id INT) RETURNS json
    DETERMINISTIC
BEGIN

RETURN 
	(SELECT json_object(
			'house_id', house_id,
            'name', name,
            'shortname', shortname,
            'avatar', avatar)
        FROM house
        WHERE house_id = v_house_id);
END