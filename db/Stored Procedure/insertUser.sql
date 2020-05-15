CREATE DEFINER=`root`@`%` PROCEDURE `insertUser`(IN v_birth datetime, IN v_email varchar(255), IN v_firstname varchar(255),
                                            IN v_lastname varchar(255), IN v_password varchar(255), IN v_house_id int)
BEGIN
	START TRANSACTION;
	INSERT INTO user (active, birth, created, email, firstname, lastname, last_online, password, house_id, role_id, status_id)
	VALUES (1, v_birth, NOW(), v_email, v_firstname, v_lastname, NOW(), v_password, v_house_id, 1, 1);
    
	SELECT getUserJSON(LAST_INSERT_ID()) as result;
    COMMIT;
	
END