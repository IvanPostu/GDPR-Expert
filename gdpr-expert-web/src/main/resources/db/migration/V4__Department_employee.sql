CREATE TABLE app."employee" (
  "employee_id" BIGSERIAL NOT NULL,
  "department_id" BIGINT NOT NULL,
  "personal_data_responsible" BOOLEAN NOT NULL,
  "email" VARCHAR(256),
  "phone_number" VARCHAR(128),
  "address" VARCHAR(256),
  PRIMARY KEY ("employee_id")
);

ALTER TABLE app.employee
ADD CONSTRAINT department_employee_fk FOREIGN KEY ("department_id") 
REFERENCES app."department"("department_id")
ON DELETE CASCADE;
