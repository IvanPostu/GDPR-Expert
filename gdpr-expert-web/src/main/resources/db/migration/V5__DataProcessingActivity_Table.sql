CREATE TABLE app.data_processing_activity 
(
  "data_processing_activity_id" BIGSERIAL NOT NULL,
  
  "organisation_id" BIGINT,
  "department_id" BIGINT,
  "employee_id" BIGINT,
  
  "activity_name" VARCHAR(256),
  "purposes" VARCHAR(256),
  "description" VARCHAR(4096),
  "sensitive_data" BOOLEAN,
  "data_owner" VARCHAR(256),
  "status" VARCHAR(32) NOT NULL, -- WAIT, IN_PROGRESS, COMPLETED

  "beginning_of_the_activity" DATE,
  "end_of_the_activity" DATE

);

ALTER TABLE app.data_processing_activity
ADD CONSTRAINT employee__data_processing_activities__fk FOREIGN KEY ("employee_id") 
REFERENCES app."employee"("employee_id")
ON DELETE SET NULL;

ALTER TABLE app.data_processing_activity
ADD CONSTRAINT department__data_processing_activities__fk FOREIGN KEY ("department_id") 
REFERENCES app."department"("department_id")
ON DELETE SET NULL;

ALTER TABLE app.data_processing_activity
ADD CONSTRAINT organisation__data_processing_activities__fk FOREIGN KEY ("organisation_id") 
REFERENCES app."organisation"("organisation_id")
ON DELETE SET NULL;

