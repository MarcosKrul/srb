DO
$$
BEGIN

  IF NOT EXISTS(
    SELECT * FROM roles WHERE "role" = 'CREATE_STUDENT' 
    AND "group_id" = (SELECT "id" FROM user_group WHERE "group" = 'EMPLOYEE')
  ) THEN 	
		INSERT INTO roles ("role", "group_id") 
    VALUES ('CREATE_STUDENT', (SELECT "id" from user_group WHERE "group" = 'EMPLOYEE'));
	END IF;

  IF NOT EXISTS(
    SELECT * FROM roles WHERE "role" = 'READ_STUDENT' 
    AND "group_id" = (SELECT "id" FROM user_group WHERE "group" = 'EMPLOYEE')
  ) THEN 	
		INSERT INTO roles ("role", "group_id") 
    VALUES ('READ_STUDENT', (SELECT "id" from user_group WHERE "group" = 'EMPLOYEE'));
	END IF;

  IF NOT EXISTS(
    SELECT * FROM roles WHERE "role" = 'UPDATE_STUDENT' 
    AND "group_id" = (SELECT "id" FROM user_group WHERE "group" = 'EMPLOYEE')
  ) THEN 	
		INSERT INTO roles ("role", "group_id") 
    VALUES ('UPDATE_STUDENT', (SELECT "id" from user_group WHERE "group" = 'EMPLOYEE'));
	END IF;

  IF NOT EXISTS(
    SELECT * FROM roles WHERE "role" = 'CREATE_BOOK' 
    AND "group_id" = (SELECT "id" FROM user_group WHERE "group" = 'EMPLOYEE')
  ) THEN 	
		INSERT INTO roles ("role", "group_id") 
    VALUES ('CREATE_BOOK', (SELECT "id" from user_group WHERE "group" = 'EMPLOYEE'));
	END IF;

  IF NOT EXISTS(
    SELECT * FROM roles WHERE "role" = 'READ_BOOK' 
    AND "group_id" = (SELECT "id" FROM user_group WHERE "group" = 'EMPLOYEE')
  ) THEN 	
		INSERT INTO roles ("role", "group_id") 
    VALUES ('READ_BOOK', (SELECT "id" from user_group WHERE "group" = 'EMPLOYEE'));
	END IF;

  IF NOT EXISTS(
    SELECT * FROM roles WHERE "role" = 'UPDATE_BOOK' 
    AND "group_id" = (SELECT "id" FROM user_group WHERE "group" = 'EMPLOYEE')
  ) THEN 	
		INSERT INTO roles ("role", "group_id") 
    VALUES ('UPDATE_BOOK', (SELECT "id" from user_group WHERE "group" = 'EMPLOYEE'));
	END IF;

  IF NOT EXISTS(
    SELECT * FROM roles WHERE "role" = 'READ_RATE' 
    AND "group_id" = (SELECT "id" FROM user_group WHERE "group" = 'EMPLOYEE')
  ) THEN 	
		INSERT INTO roles ("role", "group_id") 
    VALUES ('READ_RATE', (SELECT "id" from user_group WHERE "group" = 'EMPLOYEE'));
	END IF;

  IF NOT EXISTS(
    SELECT * FROM roles WHERE "role" = 'CREATE_LOAN' 
    AND "group_id" = (SELECT "id" FROM user_group WHERE "group" = 'EMPLOYEE')
  ) THEN 	
		INSERT INTO roles ("role", "group_id") 
    VALUES ('CREATE_LOAN', (SELECT "id" from user_group WHERE "group" = 'EMPLOYEE'));
	END IF;

  IF NOT EXISTS(
    SELECT * FROM roles WHERE "role" = 'READ_LOAN' 
    AND "group_id" = (SELECT "id" FROM user_group WHERE "group" = 'EMPLOYEE')
  ) THEN 	
		INSERT INTO roles ("role", "group_id") 
    VALUES ('READ_LOAN', (SELECT "id" from user_group WHERE "group" = 'EMPLOYEE'));
	END IF;

  IF NOT EXISTS(
    SELECT * FROM roles WHERE "role" = 'UPDATE_LOAN' 
    AND "group_id" = (SELECT "id" FROM user_group WHERE "group" = 'EMPLOYEE')
  ) THEN 	
		INSERT INTO roles ("role", "group_id") 
    VALUES ('UPDATE_LOAN', (SELECT "id" from user_group WHERE "group" = 'EMPLOYEE'));
	END IF;

END
$$;