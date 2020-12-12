

CREATE TABLE app.severity_evaluating_of_personal_data
(
	"data_processing_activity_id" BIGINT,
	"data_processing_context" INT2 DEFAULT 0,
	"ease_of_identification" INT2 DEFAULT 0,
	"circumstances_of_compromise" INT2 DEFAULT 0,
	PRIMARY KEY ("data_processing_activity_id")
);


ALTER TABLE app.severity_evaluating_of_personal_data 
ADD CONSTRAINT processing_activity__severity_evaluating_of_personal_data__fk 
FOREIGN KEY ("data_processing_activity_id") 
REFERENCES app."data_processing_activity"("data_processing_activity_id")
ON DELETE CASCADE;


