CREATE TABLE app.organisation_logo
(
	"organisation_id" BIGINT NOT NULL,
	"image_data" BYTEA,
	PRIMARY KEY ("organisation_id")
);


ALTER TABLE app.organisation_logo 
ADD CONSTRAINT organisation_organisation_logo_fk FOREIGN KEY ("organisation_id") 
REFERENCES app."organisation"("organisation_id")
ON DELETE CASCADE 
ON UPDATE CASCADE;


