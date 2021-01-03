
BEGIN;

  DELETE FROM app.gdpr_evaluation;
  
  INSERT INTO app.gdpr_evaluation (
    "organisation_id",
    "percentage_estimation",
    "completed_at"
  ) 
  VALUES
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName1' LIMIT 1),
    99.5,
    '2020-11-22'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName1' LIMIT 1),
    11.5,
    '2011-11-22'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName2' LIMIT 1),
    17.5,
    '2018-08-22'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName2' LIMIT 1),
    12.12,
    '2019-01-22'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName3' LIMIT 1),
    73.1,
    '2019-04-22'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName3' LIMIT 1),
    88.9,
    '2019-05-22'
  ),
  (
    (SELECT organisation_id FROM app.organisation WHERE name='OrganisationName3' LIMIT 1),
    15.25,
    '2019-10-22'
  );


COMMIT;
