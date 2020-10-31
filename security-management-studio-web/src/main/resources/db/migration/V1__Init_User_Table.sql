CREATE SCHEMA app;

CREATE TABLE app.user_role (
  app_user_id INT8 NOT NULL,
  role_name VARCHAR(32)
);

CREATE TABLE app.app_user (
  app_user_id BIGSERIAL NOT NULL,
  active boolean NOT NULL,
  email VARCHAR(256),
  password VARCHAR(256) NOT NULL,
  username VARCHAR(256) NOT NULL,
  PRIMARY KEY (app_user_id)
);

ALTER TABLE app.app_user
ADD CONSTRAINT app_user_unique_username 
UNIQUE (username); 



