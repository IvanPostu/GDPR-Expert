
CREATE TABLE app.user_role (
  user_id BIGINT NOT NULL, 
  role_name VARCHAR(32) NOT NULL, 
  PRIMARY KEY (user_id, role_name)
);

ALTER TABLE IF EXISTS app.user_role 
ADD CONSTRAINT user__roles__fk
FOREIGN KEY (user_id) REFERENCES app."user"
ON DELETE CASCADE 
ON UPDATE CASCADE;
