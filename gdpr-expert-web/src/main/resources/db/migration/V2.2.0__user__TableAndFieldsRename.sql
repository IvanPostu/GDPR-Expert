ALTER TABLE app."user"
RENAME TO auth_user;

ALTER TABLE app."user_role"
RENAME TO "auth_user_role";

ALTER TABLE app."auth_user" 
RENAME COLUMN "user_id" TO "auth_user_id" ;

ALTER TABLE app.auth_user_role 
RENAME COLUMN "user_id" TO "auth_user_id" ;
