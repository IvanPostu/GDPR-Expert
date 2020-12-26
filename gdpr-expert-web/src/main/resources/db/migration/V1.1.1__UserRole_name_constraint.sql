
ALTER TABLE app.user_role 
ADD CONSTRAINT user_role_name__constraint 
CHECK (
	role_name='USER' OR role_name='ADMIN'
);
