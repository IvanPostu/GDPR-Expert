BEGIN;

  DELETE FROM app.department;

  INSERT INTO app.department (
    "organisation_id",
    "name" ,
    "responsible",
    "phone_number",
    "email",
    "active" ,
    "created_at"
  ) VALUES (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName1' LIMIT 1),
    'DepartmentHardcodeName1',
    'Nicita Mircea',
    '0763416666',
    'iadadfadffia@mail.ru',
    true,
    '2011-11-23'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName1' LIMIT 1),
    'DepartmentHardcodeName2',
    'Nicita Vasile',
    '013566666',
    'iadfdafadfia@mail.ru',
    true,
    '2009-11-23'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName2' LIMIT 1),
    'DepartmentHardcodeName3',
    'Alex Mircea',
    '013661666',
    'adfadiadfia@mail.ru',
    true,
    '2016-11-23'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName2' LIMIT 1),
    'DepartmentHardcodeName4',
    'Michael Mircea',
    '031566666',
    'zcvczviadfia@mail.ru',
    true,
    '2019-11-23'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName3' LIMIT 1),
    'DepartmentHardcodeName5',
    'Dmitrii Mircea',
    '0135315666',
    'zcvczviadfia@mail.ru',
    true,
    '2012-09-23'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName4' LIMIT 1),
    'DepartmentHardcodeName6',
    'Ionel Mircea',
    '03155556',
    'wrtwtiadfia@mail.ru',
    true,
    '2010-01-23'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName5' LIMIT 1),
    'DepartmentHardcodeName7',
    'Ana Mircea',
    '01343146',
    'hntthniadfia@mail.ru',
    true,
    '2011-11-23'
  );



COMMIT;
