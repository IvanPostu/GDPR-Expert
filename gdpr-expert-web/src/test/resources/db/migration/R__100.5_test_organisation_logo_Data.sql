
BEGIN;

  DELETE FROM app.organisation_logo;

  INSERT INTO app.organisation_logo (organisation_id,image_data)
  VALUES 
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName1' LIMIT 1),
    (decode('013d7d16d7ad4fefb61bd95b765c8ceb', 'hex'))
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName2' LIMIT 1),
    (decode('013d7d16d7ad4fefb61bd95b765c8ceb', 'hex'))
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName3' LIMIT 1),
    (decode('013d7d16d7ad4fefb61bd95b765c8ceb', 'hex'))
  )
  ;

COMMIT;
