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
  email VARCHAR(256),
  "password" VARCHAR(256) NOT NULL,
  PRIMARY KEY (user_id)
);

ALTER TABLE app."user"
ADD CONSTRAINT user_unique_email
UNIQUE (email); 

ALTER TABLE IF EXISTS app.user_role 
ADD CONSTRAINT user_role_fk
FOREIGN KEY (user_id) REFERENCES app."user";
