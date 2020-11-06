CREATE TABLE IF NOT EXISTS app.organisation
(
	"organisation_id" BIGSERIAL NOT NULL,
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
-- legal_form: Întreprinzătorul individual
-- Societate în nume colectiv
-- Societate în comandită
-- Cooperativă (de producție și întreprinzători)
-- Societate cu răspundere limitată
-- Societate pe acțiuni (tip deschis și tip închis)

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

