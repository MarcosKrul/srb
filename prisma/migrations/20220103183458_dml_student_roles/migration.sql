DO
$$
BEGIN

  IF NOT EXISTS(
    SELECT * FROM roles WHERE "role" = 'READ_LOAN' 
    AND "group_id" = (SELECT "id" FROM user_group WHERE "group" = 'STUDENT')
  ) THEN
		INSERT INTO roles ("role", "group_id") 
    VALUES ('READ_LOAN', (SELECT "id" from user_group WHERE "group" = 'STUDENT'));
	END IF;

  IF NOT EXISTS(
    SELECT * FROM roles WHERE "role" = 'READ_BOOK' 
    AND "group_id" = (SELECT "id" FROM user_group WHERE "group" = 'STUDENT')
  ) THEN	
		INSERT INTO roles ("role", "group_id") 
    VALUES ('READ_BOOK', (SELECT "id" from user_group WHERE "group" = 'STUDENT'));
	END IF;

END
$$;