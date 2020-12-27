BEGIN;


  DELETE FROM app.data_processing_activity;

  INSERT INTO app.data_processing_activity (
    "organisation_id",
    "department_id",
    "employee_id",
    "activity_name",
    "purposes",
    "description",
    "sensitive_data",
    "data_owner",
    "status",
    "beginning_of_the_activity",
    "end_of_the_activity"
  ) VALUES 
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName1' LIMIT 1),
    (SELECT department_id FROM app.department WHERE name='DepartmentHardcodeName1' LIMIT 1),
    (SELECT employee_id FROM app.employee WHERE email='employee1@mail.ru' LIMIT 1),
    'ProcesareDeDateN1',
    'Purposes example ...',
    'Description example ...',
    true,
    'Mihai Sazaki',
    'activ',
    '2018-11-11',
    '2018-12-11'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName1' LIMIT 1),
    (SELECT department_id FROM app.department WHERE name='DepartmentHardcodeName1' LIMIT 1),
    (SELECT employee_id FROM app.employee WHERE email='employee2@mail.ru' LIMIT 1),
    'ProcesareDeDateN2',
    'Purposes example ...',
    'Description example ...',
    true,
    'Mihai Sazaki',
    'activ',
    '2018-11-11',
    '2018-12-11'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName1' LIMIT 1),
    (SELECT department_id FROM app.department WHERE name='DepartmentHardcodeName2' LIMIT 1),
    (SELECT employee_id FROM app.employee WHERE email='employee3@mail.ru' LIMIT 1),
    'ProcesareDeDateN3',
    'Purposes example ...',
    'Description example ...',
    true,
    'Mihai Sazaki',
    'activ',
    '2018-11-11',
    '2018-12-11'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName1' LIMIT 1),
    (SELECT department_id FROM app.department WHERE name='DepartmentHardcodeName2' LIMIT 1),
    (SELECT employee_id FROM app.employee WHERE email='employee4@mail.ru' LIMIT 1),
    'ProcesareDeDateN4',
    'Purposes example ...',
    'Description example ...',
    true,
    'Mihai Sazaki',
    'activ',
    '2018-11-11',
    '2018-12-11'
  );


COMMIT;
