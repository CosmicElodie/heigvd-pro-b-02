CREATE DEFINER=`root`@`localhost` EVENT `event_5th_month_status_manager` ON SCHEDULE EVERY 1 MONTH STARTS '2020-05-05 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
		DECLARE v_i INT DEFAULT 0; 
        DECLARE v_event JSON;
		DECLARE v_active_events JSON DEFAULT (	
												SELECT json_arrayagg(DEV.getEventDetailJson(event_id)) as events
												FROM DEV.event 
                                                WHERE status = 'En attente de résultats'
											);
                                            
		WHILE v_i < JSON_LENGTH(v_active_events) DO
			SELECT JSON_EXTRACT(v_active_events, CONCAT('$[',v_i,']')) INTO v_event;

				/*Annuler l'événement directement sans attribution de point*/
            UPDATE event SET status = 'Terminé' WHERE event_id = JSON_EXTRACT(v_event, '$.event_id');

            
			SELECT v_i + 1 INTO v_i;
		END WHILE;                                      
     
	END