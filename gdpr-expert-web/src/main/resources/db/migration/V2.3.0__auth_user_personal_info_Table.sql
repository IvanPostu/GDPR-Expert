
CREATE TABLE app.auth_user_personal_info
(
  auth_user_id BIGINT NOT NULL,
  firstname VARCHAR(256) DEFAULT '',
  lastname VARCHAR(256) DEFAULT '',
  date_of_birth DATE,
  phone_number VARCHAR(16),
  PRIMARY KEY (auth_user_id)
);

-- One to one auth_user -> auth_user_personal_info
ALTER TABLE app.auth_user_personal_info 
ADD CONSTRAINT user__user_personal_info__fk 
FOREIGN KEY ("auth_user_id") 
REFERENCES app."auth_user"("auth_user_id")
ON DELETE CASCADE 
ON UPDATE CASCADE;

