
CREATE TABLE IF NOT EXISTS app.gdpr_evaluation
(
	"gdpr_evaluation_id" BIGSERIAL NOT NULL,
  "organisation_id" BIGINT,
  "percentage_estimation" FLOAT,
	"completed_at" DATE,
	PRIMARY KEY ("gdpr_evaluation_id")
);

ALTER TABLE app.gdpr_evaluation 
ADD CONSTRAINT organisation__gdpr_evaluations__fk
FOREIGN KEY ("organisation_id") 
REFERENCES app."organisation"("organisation_id")
ON DELETE CASCADE;

