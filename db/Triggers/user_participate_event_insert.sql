DELIMITER //
DROP TRIGGER user_participate_event_insert;
CREATE TRIGGER user_participate_event_insert
AFTER INSERT
ON user_participate_event FOR EACH ROW
BEGIN
	DECLARE v_count_participants INT DEFAULT (SELECT count(user_id) FROM user_participate_event WHERE event_id = NEW.event_id);
    DECLARE v_min_participants INT DEFAULT (SELECT attendees_min FROM event WHERE event_id = NEW.event_id);
    IF v_count_participants >= v_min_participants THEN
		UPDATE event SET status = 'En cours' WHERE event_id = NEW.event_id;
	END IF;
END;
