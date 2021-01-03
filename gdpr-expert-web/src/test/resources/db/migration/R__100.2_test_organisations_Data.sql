
BEGIN;

DELETE FROM app.organisation ;

  INSERT INTO app.organisation 
  ( 
    user_owner_id,
    name,
    description,
    legal_form,
    address,
    administrator,
    phone_number,
    email,
    active,
    created_on_platform_at,
    founded_at
  )
  VALUES
  (
    (SELECT auth_user_id FROM app.auth_user WHERE email='vasile@mail.ru' LIMIT 1),
    'OrganisationName1',
    'default description1 ...',
    'S.R.L.',
    '52 street',
    'Masyanya Fox',
    '067676767',
    'q1@mail.ru',
    true,
    timestamp '2020-01-01 00:00:00.001',
    '2010-12-01'
  ),
  (
    (SELECT auth_user_id FROM app.auth_user WHERE email='vasile@mail.ru' LIMIT 1),
    'OrganisationName2',
    'default description2 ...',
    'S.R.L.',
    '53 street',
    'Mihail Vasilevici',
    '07978978',
    'w2@mail.ru',
    true,
    timestamp '2010-01-01 00:00:00.001',
    '2011-11-21'
  ),
  (
    (SELECT auth_user_id FROM app.auth_user WHERE email='mihail@mail.ru' LIMIT 1),
    'OrganisationName3',
    'default description3 ...',
    'S.R.L.',
    '54 street',
    'Mihail Kirilovici',
    '07978978',
    'eee3@mail.ru',
    true,
    timestamp '2010-01-01 00:00:00.001',
    '2011-11-21'
  ),
  (
    (SELECT auth_user_id FROM app.auth_user WHERE email='mihail@mail.ru' LIMIT 1),
    'OrganisationName4',
    'default description4 ...',
    'S.R.L.',
    '55 street',
    'Roman Vasilevici',
    '07978978',
    'zzz3@mail.ru',
    true,
    timestamp '2010-01-01 00:00:00.001',
    '2011-11-21'
  ),
  (
    (SELECT auth_user_id FROM app.auth_user WHERE email='mihail@mail.ru' LIMIT 1),
    'OrganisationName5',
    'default description5 ...',
    'S.R.L.',
    '56 street',
    'Ion Vasilevici',
    '07978978',
    'ggg3@mail.ru',
    true,
    timestamp '2010-01-01 00:00:00.001',
    '2011-11-21'
  );


COMMIT;
