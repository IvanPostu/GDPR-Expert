
BEGIN;

  DELETE FROM app.request_for_personal_info;
  
  INSERT INTO app.request_for_personal_info (
    organisation_id,
    is_processed,
    requested_at,
    requested_right,
    comment,
    person_firstname,
    person_lastname,
    person_email,
    person_phone_number
  ) VALUES (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName1' LIMIT 1),
    false,
    '2019-11-11',
    'data access',
    'Coment example1 ...',
    'Ion',
    'Vasilachi',
    'ion@mail.ru',
    '087654444'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName1' LIMIT 1),
    false,
    '2019-11-11',
    'data access',
    'Coment example2 ...',
    'Marin',
    'Vasilachi',
    'marin@mail.ru',
    '087654444'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName2' LIMIT 1),
    false,
    '2019-11-11',
    'data access',
    'Coment example3 ...',
    'Alex',
    'Vasilachi',
    'alex@mail.ru',
    '087654444'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName3' LIMIT 1),
    false,
    '2019-11-11',
    'data access',
    'Coment example4 ...',
    'Jimmy',
    'Vasilachi',
    'jimmy@mail.ru',
    '087654444'
  );


COMMIT;
