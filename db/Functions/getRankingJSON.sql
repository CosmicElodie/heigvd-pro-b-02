CREATE DEFINER=`root`@`localhost` FUNCTION `getRankingJSON`() RETURNS json
    DETERMINISTIC
BEGIN

    RETURN (SELECT json_arrayagg(JSON_object( 
            'user', getUserJSON(user_id),
            'total_points', total_points)) as result
            FROM (SELECT user.*, SUM(points) as total_points
                  FROM points_log
                           INNER JOIN user USING(user_id)
						   INNER JOIN house using(house_id)

                  group by user_id, house.name
                  ORDER BY total_points DESC
                 ) as log);
END