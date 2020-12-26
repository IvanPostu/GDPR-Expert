
CREATE TABLE app."user" (
  user_id BIGSERIAL NOT NULL,
  active BOOLEAN NOT NULL,
  email VARCHAR(256) UNIQUE,
  "password" VARCHAR(256) NOT NULL,
  PRIMARY KEY (user_id)
);

