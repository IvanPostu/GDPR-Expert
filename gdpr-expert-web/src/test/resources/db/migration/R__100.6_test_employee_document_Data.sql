

BEGIN;

  DELETE FROM app.employee_document;

  INSERT INTO app.employee_document (
    "employee_id",
    "file_name",
    "document_data",
    "uploaded_to_the_platform_at"
  )
  VALUES 
  (
    (SELECT employee_id FROM app.employee WHERE email='employee1@mail.ru' LIMIT 1),
    'doc1.doc',
    (decode('013d7d16d7ad4fefb61bd95b765c8ceb', 'hex')),
    '2019-12-23'
  ),
  (
    (SELECT employee_id FROM app.employee WHERE email='employee1@mail.ru' LIMIT 1),
    'doc1.doc',
    (decode('013d7d16d7ad4fefb61bd95b765c8ceb', 'hex')),
    '2019-11-23'
  ),
  (
    (SELECT employee_id FROM app.employee WHERE email='employee2@mail.ru' LIMIT 1),
    'doc1.doc',
    (decode('013d7d16d7ad4fefb61bd95b765c8ceb', 'hex')),
    '2019-01-23'
  ),
  (
    (SELECT employee_id FROM app.employee WHERE email='employee2@mail.ru' LIMIT 1),
    'doc1.doc',
    (decode('013d7d16d7ad4fefb61bd95b765c8ceb', 'hex')),
    '2019-11-23'
  ),
  (
    (SELECT employee_id FROM app.employee WHERE email='employee3@mail.ru' LIMIT 1),
    'doc1.doc',
    (decode('013d7d16d7ad4fefb61bd95b765c8ceb', 'hex')),
    '2019-11-23'
  );

COMMIT;

