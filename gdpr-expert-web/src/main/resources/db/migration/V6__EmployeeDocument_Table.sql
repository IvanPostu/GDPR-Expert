CREATE TABLE app.employee_document 
(
  "employee_id" BIGINT NOT NULL,
  "file_name" VARCHAR(64) NOT NULL,
  "document_data" BYTEA,
  "uploaded_to_the_platform_at" DATE,

  PRIMARY KEY("employee_id", "file_name")
);


ALTER TABLE app.employee_document
ADD CONSTRAINT employee__employee_document__fk FOREIGN KEY ("employee_id") 
REFERENCES app."employee"("employee_id")
ON DELETE CASCADE;
