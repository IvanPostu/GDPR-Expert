
# flyway migrate

psql -U postgres -d app_db << EOF
	ALTER TABLE app.department DISABLE TRIGGER ALL;
	ALTER TABLE app.employee DISABLE TRIGGER ALL;
	ALTER TABLE app.employee_document DISABLE TRIGGER ALL;
	ALTER TABLE app.gdpr_evaluation DISABLE TRIGGER ALL;
	ALTER TABLE app.organisation DISABLE TRIGGER ALL;
	ALTER TABLE app.organisation_logo DISABLE TRIGGER ALL;
	ALTER TABLE app.data_processing_activity DISABLE TRIGGER ALL;
EOF


pg_restore -U postgres --dbname=app_db --data-only ./app_db.tar


psql -U postgres -d app_db << EOF
	ALTER TABLE app.department ENABLE TRIGGER ALL;
	ALTER TABLE app.employee ENABLE TRIGGER ALL;
	ALTER TABLE app.employee_document ENABLE TRIGGER ALL;
	ALTER TABLE app.gdpr_evaluation ENABLE TRIGGER ALL;
	ALTER TABLE app.organisation ENABLE TRIGGER ALL;
	ALTER TABLE app.organisation_logo ENABLE TRIGGER ALL;
	ALTER TABLE app.data_processing_activity ENABLE TRIGGER ALL;
EOF
