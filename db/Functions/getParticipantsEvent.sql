CREATE DEFINER=`root`@`%` FUNCTION `getParticipantsEvent`(v_event_id INT) RETURNS json
    DETERMINISTIC
BEGIN

RETURN (SELECT json_arrayagg(JSON_OBJECT(
    'participant', getUserJSON(user_id))) FROM user_participate_event
    WHERE event_id = v_event_id);
END