CREATE DEFINER=`root`@`%` FUNCTION `getDetailHouseJSON`(v_house_id INT) RETURNS json
    DETERMINISTIC
BEGIN
	RETURN (SELECT JSON_OBJECT(
			'house_id', house_id,
            'name', name,
            'shortname', shortname,
            'avatar', avatar,
            'nb_members', nb_members,
            'nb_events', nb_events,
            -- 'nb_victories', nb_victories,
            'nb_participants', nb_participants,
            'nb_subjects', nb_subjects,
            'nb_posts', nb_posts,
            'total_pts', sum(getPointsHouse(house_id)),
            'top_user', getTopUserFromHouseJSON(house_id, 1)
            ) AS result
            FROM (
				SELECT house.*,
					count(distinct user.user_id) as nb_members,
                    count(distinct event.event_id) as nb_events,
                    count(distinct user_participate_event.user_id) as nb_participants,
                    count(distinct forum_subject.user_id) as nb_subjects,
                    count(distinct forum_post.user_id) as nb_posts
				FROM house
				LEFT JOIN user USING(house_id)
                LEFT JOIN event USING(user_id)
                LEFT JOIN user_participate_event USING(user_id)
                LEFT JOIN forum_subject USING(user_id)
                LEFT JOIN forum_post USING(user_id)
                LEFT JOIN points_log USING(user_id)
                WHERE user.active = 1 and house.house_id = v_house_id
				GROUP BY house_id) AS house_count
			GROUP BY house_id);
END