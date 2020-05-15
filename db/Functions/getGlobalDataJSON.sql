CREATE DEFINER=`root`@`%` FUNCTION `getGlobalDataJSON`() RETURNS json
    DETERMINISTIC
BEGIN


    RETURN (SELECT JSON_OBJECT(
                'houses', (SELECT JSON_ARRAYAGG(JSON_OBJECT(
                                    'house_id', house_id,
                                    'name', name,
                                    'shortname', shortname
                            ))
                            FROM house)
                )
    );
END