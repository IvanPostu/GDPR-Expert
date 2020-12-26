CREATE TABLE app.department
(
	"department_id" BIGSERIAL NOT NULL,
	"organisation_id" BIGINT NOT NULL,
	"name" VARCHAR(128),
	"responsible" VARCHAR(512),
	"phone_number" VARCHAR(256),
	"email" VARCHAR(256),
	"active" BOOLEAN NOT NULL,
	"created_at" TIMESTAMP,
	PRIMARY KEY ("department_id")
);

ALTER TABLE app.department 
ADD CONSTRAINT organisation_department_fk
FOREIGN KEY ("organisation_id") 
REFERENCES app."organisation"("organisation_id")
ON DELETE CASCADE 
ON UPDATE CASCADE;
