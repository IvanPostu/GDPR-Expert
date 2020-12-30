

BEGIN;

  DELETE FROM app.user;

  INSERT INTO app.user (active, email, password)
  VALUES
  (true, 'vasile@mail.ru', 'qwertyu'),
  (true, 'mihail@mail.ru', '12345q'),
  (false, 'ion007@gmail.ru', 'masianya'),
  (true, 'ricki89@gmail.ru', 'masianya'),
  (true, 'teodor87876@gmail.ru', 'masianya'),
  (true, 'abce__ofxzr09q12@gmail.ru', 'masianya'),
  (true, 'without_roles@gmail.ru', 'masianya'),
  (false, 'qwerty007@gmail.ru', 'masianya');

  INSERT INTO app.user_role (user_id, role_name)
  VALUES
  ((SELECT user_id FROM app.user WHERE email='vasile@mail.ru' LIMIT 1), 'USER'),
  ((SELECT user_id FROM app.user WHERE email='mihail@mail.ru' LIMIT 1), 'USER'),
  ((SELECT user_id FROM app.user WHERE email='ion007@gmail.ru' LIMIT 1), 'USER'),
  ((SELECT user_id FROM app.user WHERE email='ricki89@gmail.ru' LIMIT 1), 'USER'),
  ((SELECT user_id FROM app.user WHERE email='teodor87876@gmail.ru' LIMIT 1), 'USER'),
  ((SELECT user_id FROM app.user WHERE email='abce__ofxzr09q12@gmail.ru' LIMIT 1), 'USER'),
  ((SELECT user_id FROM app.user WHERE email='qwerty007@gmail.ru' LIMIT 1), 'USER'),

  ((SELECT user_id FROM app.user WHERE email='vasile@mail.ru' LIMIT 1), 'ADMIN'),
  ((SELECT user_id FROM app.user WHERE email='mihail@mail.ru' LIMIT 1), 'ADMIN'),
  ((SELECT user_id FROM app.user WHERE email='ion007@gmail.ru' LIMIT 1), 'ADMIN');

  

COMMIT;

