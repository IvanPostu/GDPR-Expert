

BEGIN;

  DELETE FROM app.employee;

  INSERT INTO app.employee (
    "department_id",
    "personal_data_responsible",
    "email",
    "first_name",
    "last_name",
    "phone_number",
    "address"
  ) VALUES 
  (
    (SELECT department_id FROM app.department WHERE name='DepartmentHardcodeName1' LIMIT 1),
    true,
    'employee1@mail.ru',
    'Ion',
    'Popovici',
    '097314455',
    '56 street'
  ),
  (
    (SELECT department_id FROM app.department WHERE name='DepartmentHardcodeName1' LIMIT 1),
    true,
    'employee2@mail.ru',
    'Maxim',
    'Popovici',
    '09356536',
    '56 street'
  ),
  (
    (SELECT department_id FROM app.department WHERE name='DepartmentHardcodeName2' LIMIT 1),
    true,
    'employee3@mail.ru',
    'Jimmy',
    'Popovici',
    '09579759455',
    '56 street'
  ),
  (
    (SELECT department_id FROM app.department WHERE name='DepartmentHardcodeName2' LIMIT 1),
    true,
    'employee4@mail.ru',
    'Vasile',
    'Popovici',
    '0790975',
    '56 street'
  ),
  (
    (SELECT department_id FROM app.department WHERE name='DepartmentHardcodeName3' LIMIT 1),
    true,
    'employee5@mail.ru',
    'Maxim',
    'Victor',
    '09524542455',
    '56 street'
  ),
  (
    (SELECT department_id FROM app.department WHERE name='DepartmentHardcodeName4' LIMIT 1),
    true,
    'employee6@mail.ru',
    'Maxim',
    'Sergiu',
    '013465455',
    '58 street'
  );

COMMIT;
