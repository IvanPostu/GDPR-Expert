-- \d app.*
CREATE SCHEMA app;


CREATE TABLE app.user_role (
  user_id BIGINT NOT NULL, 
  role_name VARCHAR(32) NOT NULL, 
  PRIMARY KEY (user_id, role_name)
);

CREATE TABLE app."user" (
  user_id BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  email VARCHAR(256) UNIQUE,
  "password" VARCHAR(256) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE INDEX user_email_index ON app."user" (email);

ALTER TABLE IF EXISTS app.user_role 
ADD CONSTRAINT user__roles__fk
FOREIGN KEY (user_id) REFERENCES app."user"
ON DELETE CASCADE;
