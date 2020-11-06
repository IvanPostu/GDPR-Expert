CREATE TABLE IF NOT EXISTS app.organisation
(
	"organisation_id" BIGSERIAL NOT NULL,
  "user_owner_id" BIGINT NOT NULL,
	"name" VARCHAR(128),
	"legal_form" VARCHAR(64), 
	"address" VARCHAR(256),
	"administrator" VARCHAR(256),
	"phone_number" VARCHAR(128),
	"email" VARCHAR(128),
	"active" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP,
	PRIMARY KEY ("organisation_id")
	
);

ALTER TABLE IF EXISTS app.organisation 
ADD CONSTRAINT userowner_organisation_fk
FOREIGN KEY ("user_owner_id") 
REFERENCES app."user"("user_id");


CREATE TABLE IF NOT EXISTS app.department
(
	"department_id" BIGSERIAL NOT NULL,
	"organisation_id" BIGINT NOT NULL,
	"name" VARCHAR(128),
	"responsible" VARCHAR(256),
	"phone_number" VARCHAR(256),
	"email" VARCHAR(128),
	"active" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP,
	PRIMARY KEY ("department_id")
);

ALTER TABLE IF EXISTS app.department 
ADD CONSTRAINT organisation_department_fk
FOREIGN KEY ("organisation_id") 
REFERENCES app."organisation"("organisation_id");

