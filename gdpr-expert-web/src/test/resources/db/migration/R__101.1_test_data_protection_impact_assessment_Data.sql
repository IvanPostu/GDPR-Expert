BEGIN;

  DELETE FROM app.data_protection_impact_assessment ;

  INSERT INTO app.data_protection_impact_assessment 
  (
    "data_processing_activity_id",
    "document_file",
    "file_name"
  ) VALUES (
    (
      SELECT data_processing_activity_id FROM app.data_processing_activity 
      WHERE activity_name='ProcesareDeDateN1' LIMIT 1
    ),
    (decode('013d7d16d7ad4fefb61bd95b765c8ceb', 'hex')),
    'document-name.doc'
  ),(
    (
      SELECT data_processing_activity_id FROM app.data_processing_activity 
      WHERE activity_name='ProcesareDeDateN2' LIMIT 1
    ), 
    (decode('013d7d16d7ad4fefb61bd95b765c8ceb', 'hex')),
    'document-name.doc'
  ),(
    (
      SELECT data_processing_activity_id FROM app.data_processing_activity 
      WHERE activity_name='ProcesareDeDateN3' LIMIT 1
    ),
    (decode('013d7d16d7ad4fefb61bd95b765c8ceb', 'hex')),
    'document-name.doc'
  ),(
    (
      SELECT data_processing_activity_id FROM app.data_processing_activity 
      WHERE activity_name='ProcesareDeDateN4' LIMIT 1
    ),
    (decode('013d7d16d7ad4fefb61bd95b765c8ceb', 'hex')),
    'document-name.doc'
  );

COMMIT;
