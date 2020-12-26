CREATE TABLE app.organisation
(
	"organisation_id" BIGSERIAL NOT NULL,
  "user_owner_id" BIGINT NOT NULL,
	"name" VARCHAR(128),
  "description" VARCHAR(4096) DEFAULT '',
	"legal_form" VARCHAR(64), 
	"address" VARCHAR(512),
	"administrator" VARCHAR(512),
	"phone_number" VARCHAR(256),
	"email" VARCHAR(256),
	"active" BOOLEAN NOT NULL,
	"created_on_platform_at" TIMESTAMP,
	"founded_at" DATE,
	PRIMARY KEY ("organisation_id")
	
);

ALTER TABLE app.organisation 
ADD CONSTRAINT user_owner__organisations__fk
FOREIGN KEY ("user_owner_id") 
REFERENCES app."user"("user_id")
ON DELETE CASCADE 
ON UPDATE CASCADE;
