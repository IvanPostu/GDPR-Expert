

CREATE TABLE app.data_protection_impact_assessment
(
	"data_processing_activity_id" BIGINT NOT NULL,
	"document_file" BYTEA,
  "file_name" VARCHAR(384) NOT NULL,

	PRIMARY KEY ("data_processing_activity_id")
);


ALTER TABLE app.data_protection_impact_assessment 
ADD CONSTRAINT processing_activity__data_protection_impact_assessment__fk 
FOREIGN KEY ("data_processing_activity_id") 
REFERENCES app."data_processing_activity"("data_processing_activity_id")
ON DELETE CASCADE 
ON UPDATE CASCADE;


