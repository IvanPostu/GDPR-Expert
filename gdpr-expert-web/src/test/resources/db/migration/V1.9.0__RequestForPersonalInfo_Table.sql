
CREATE TABLE IF NOT EXISTS app.request_for_personal_info
(
	"request_for_personal_info_id" BIGSERIAL NOT NULL,
  "organisation_id" BIGINT,
  "is_processed" BOOLEAN DEFAULT FALSE,
	"requested_at" DATE,

  "requested_right" VARCHAR(2048),
  "comment" VARCHAR(2048),

  "person_firstname" VARCHAR(128),
  "person_lastname" VARCHAR(128),
  "person_email" VARCHAR(128),
  "person_phone_number" VARCHAR(128),
	PRIMARY KEY ("request_for_personal_info_id")
);

ALTER TABLE app.request_for_personal_info 
ADD CONSTRAINT organisation__request_for_personal_info__fk
FOREIGN KEY ("organisation_id") 
REFERENCES app."organisation"("organisation_id")
ON DELETE CASCADE 
ON UPDATE CASCADE;

