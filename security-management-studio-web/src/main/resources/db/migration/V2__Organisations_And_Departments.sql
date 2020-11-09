CREATE TABLE  app.organisation
(
	"organisation_id" BIGSERIAL NOT NULL,
  "user_owner_id" BIGINT NOT NULL,
	"name" VARCHAR(128),
  "description" VARCHAR(1024) DEFAULT '',
	"legal_form" VARCHAR(64), 
	"address" VARCHAR(256),
	"administrator" VARCHAR(256),
	"phone_number" VARCHAR(128),
	"email" VARCHAR(128),
	"active" BOOLEAN NOT NULL,
	"created_on_platform_at" TIMESTAMP,
	"founded_at" DATE,
	PRIMARY KEY ("organisation_id")
	
);

ALTER TABLE app.organisation 
ADD CONSTRAINT userowner_organisation_fk
FOREIGN KEY ("user_owner_id") 
REFERENCES app."user"("user_id")
ON DELETE CASCADE;


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

ALTER TABLE app.department 
ADD CONSTRAINT organisation_department_fk
FOREIGN KEY ("organisation_id") 
REFERENCES app."organisation"("organisation_id")
ON DELETE CASCADE;

