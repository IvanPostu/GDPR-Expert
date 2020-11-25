CREATE TABLE app.processing_activity 
(
  "processing_activity_id" BIGSERIAL NOT NULL,
  
  "organisation_id" BIGINT,
  "department_id" BIGINT,
  "employee_id" BIGINT,
  
  "activity_name" VARCHAR(256),
  "purposes" VARCHAR(256),
  "description" VARCHAR(512),
  "sensitive_data" BOOLEAN,
  "data_owner" VARCHAR(256),
  "status" VARCHAR(32) NOT NULL, -- WAIT, IN_PROGRESS, COMPLETED

  "beginning_of_the_activity" TIMESTAMP,
  "end_of_the_activity" TIMESTAMP

);

ALTER TABLE app.processing_activity
ADD CONSTRAINT employee_processing_activity_fk FOREIGN KEY ("employee_id") 
REFERENCES app."employee"("employee_id")
ON DELETE SET NULL;

ALTER TABLE app.processing_activity
ADD CONSTRAINT department_processing_activity_fk FOREIGN KEY ("department_id") 
REFERENCES app."department"("department_id")
ON DELETE SET NULL;

ALTER TABLE app.processing_activity
ADD CONSTRAINT organisation_processing_activity_fk FOREIGN KEY ("organisation_id") 
REFERENCES app."organisation"("organisation_id")
ON DELETE SET NULL;

