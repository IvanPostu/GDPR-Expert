

BEGIN;

INSERT INTO app.auth_user_personal_info
(
  auth_user_id,
  firstname,
  lastname,
  date_of_birth,
  phone_number
)VALUES
(
  (SELECT auth_user_id FROM app.auth_user WHERE email='vasile@mail.ru' LIMIT 1),
  'Vasile',
  'Kirov',
  '2010-11-22',
  '076767678'
),
(
  (SELECT auth_user_id FROM app.auth_user WHERE email='mihail@mail.ru' LIMIT 1),
  'Mihai',
  'Kirov',
  '2011-11-22',
  '076267678'
);

COMMIT;

