CREATE TABLE app.employee_document 
(
  "employee_document_id" BIGSERIAL NOT NULL,
  "employee_id" BIGINT,
  "file_name" VARCHAR(384) NOT NULL,
  "document_data" BYTEA,
  "uploaded_to_the_platform_at" DATE,

  PRIMARY KEY("employee_document_id")
);


ALTER TABLE app.employee_document
ADD CONSTRAINT employee__employee_document__fk FOREIGN KEY ("employee_id") 
REFERENCES app."employee"("employee_id")
ON DELETE CASCADE 
ON UPDATE CASCADE;
