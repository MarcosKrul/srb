DO
$$
BEGIN

	IF NOT EXISTS(SELECT * FROM user_group WHERE "group" = 'ADM') THEN 	
		INSERT INTO user_group ("group") VALUES('ADM');
	END IF;

	IF NOT EXISTS(SELECT * FROM user_group WHERE "group" = 'MANAGER') THEN 	
		INSERT INTO user_group ("group") VALUES('MANAGER');
	END IF;

	IF NOT EXISTS(SELECT * FROM user_group WHERE "group" = 'EMPLOYEE') THEN 	
		INSERT INTO user_group ("group") VALUES('EMPLOYEE');
	END IF;

	IF NOT EXISTS(SELECT * FROM user_group WHERE "group" = 'STUDENT') THEN 	
		INSERT INTO user_group ("group") VALUES('STUDENT');
	END IF;

END
$$;