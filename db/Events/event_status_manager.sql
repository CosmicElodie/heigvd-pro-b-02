CREATE DEFINER=`root`@`%` EVENT `event_status_manager` ON SCHEDULE EVERY 1 MINUTE STARTS '2020-05-24 15:47:57' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
		DECLARE v_i INT DEFAULT 0; 
        DECLARE v_event JSON;
		DECLARE v_active_events JSON DEFAULT (	
												SELECT json_arrayagg(DEV.getEventDetailJson(event_id)) as events
												FROM DEV.event 
                                                WHERE status <> 'Annulé' AND status <> 'Terminé' AND status <> 'En attente de résultats'
											);
                                            
		WHILE v_i < JSON_LENGTH(v_active_events) DO
			SELECT JSON_EXTRACT(v_active_events, CONCAT('$[',v_i,']')) INTO v_event;
			IF(JSON_EXTRACT(v_event, '$.status') = 'En attente de participants' AND CAST(JSON_EXTRACT(v_event, '$.deadline_reservation') as DATETIME) < NOW() AND JSON_EXTRACT(v_event, '$.nb_attendees') < JSON_EXTRACT(v_event, '$.attendees_min')) THEN
				/*Annuler l'événement*/
                UPDATE event SET status = 'Annulé' WHERE event_id = JSON_EXTRACT(v_event, '$.event_id');
            END IF;
            
            IF(JSON_EXTRACT(v_event, '$.status') = 'Planifié' AND CAST(JSON_EXTRACT(v_event, '$.date_begin') as DATETIME) < NOW()) THEN
				/* Evénement est en cours, comptabiliser les points */
				UPDATE event SET status = 'En cours' WHERE event_id = JSON_EXTRACT(v_event, '$.event_id');
            END IF;
            
            
            IF(JSON_EXTRACT(v_event, '$.status') = 'En cours' AND CAST(JSON_EXTRACT(v_event, '$.date_end') as DATE) < NOW() AND JSON_EXTRACT(v_event, '$.is_competitive') = 1) THEN
        /* Evénement est passé, comptabiliser les points */
        UPDATE event SET status = 'En attente de résultats' WHERE event_id = JSON_EXTRACT(v_event, '$.event_id');
            END IF;
            
            IF(JSON_EXTRACT(v_event, '$.status') = 'En cours' AND CAST(JSON_EXTRACT(v_event, '$.date_end') as DATE) < NOW() AND JSON_EXTRACT(v_event, '$.is_competitive') = 0) THEN
        /* Evénement est passé, ne pas comptabiliser les points */
        UPDATE event SET status = 'Terminé' WHERE event_id = JSON_EXTRACT(v_event, '$.event_id');
            END IF;
            
			SELECT v_i + 1 INTO v_i;
		END WHILE;                                      
     
	END
