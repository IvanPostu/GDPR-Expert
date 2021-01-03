
BEGIN;

  DELETE FROM app.severity_evaluating_of_personal_data;
  

  INSERT INTO app.severity_evaluating_of_personal_data
  (
    "data_processing_activity_id",
    "data_processing_context",
    "ease_of_identification",
    "circumstances_of_compromise",
    "evaluated_at"
  )
  VALUES
  (
    (
      SELECT data_processing_activity_id FROM app.data_processing_activity 
      WHERE activity_name='ProcesareDeDateN1' LIMIT 1
    ),
    3,
    1,
    1,
    '2020-11-11'
  ),
  (
    (
      SELECT data_processing_activity_id FROM app.data_processing_activity 
      WHERE activity_name='ProcesareDeDateN2' LIMIT 1
    ),
    1,
    3,
    1,
    '2020-11-11'
  ),
  (
    (
      SELECT data_processing_activity_id FROM app.data_processing_activity 
      WHERE activity_name='ProcesareDeDateN3' LIMIT 1
    ),
    1,
    2,
    1,
    '2020-11-11'
  ),
  (
    (
      SELECT data_processing_activity_id FROM app.data_processing_activity 
      WHERE activity_name='ProcesareDeDateN4' LIMIT 1
    ),
    2,
    1,
    1,
    '2020-11-11'
  );

COMMIT;