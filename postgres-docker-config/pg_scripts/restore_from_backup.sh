#!/bin/sh

# flyway migrate

psql -U postgres -d app_db << EOF
	ALTER TABLE auth_user_personal_info DISABLE TRIGGER ALL;
	ALTER TABLE auth_user_role DISABLE TRIGGER ALL;
	ALTER TABLE data_processing_activity DISABLE TRIGGER ALL;
	ALTER TABLE data_protection_impact_assessment DISABLE TRIGGER ALL;
	ALTER TABLE department DISABLE TRIGGER ALL;
	ALTER TABLE employee DISABLE TRIGGER ALL;
	ALTER TABLE employee_document DISABLE TRIGGER ALL;
	ALTER TABLE gdpr_evaluation DISABLE TRIGGER ALL;
	ALTER TABLE organisation DISABLE TRIGGER ALL;
	ALTER TABLE organisation_logo DISABLE TRIGGER ALL;
	ALTER TABLE request_for_personal_info DISABLE TRIGGER ALL;
	ALTER TABLE severity_evaluating_of_personal_data DISABLE TRIGGER ALL;
EOF


pg_restore -U postgres --dbname=app_db --data-only ./app_db.tar


psql -U postgres -d app_db << EOF
	ALTER TABLE auth_user_personal_info ENABLE TRIGGER ALL;
	ALTER TABLE auth_user_role ENABLE TRIGGER ALL;
	ALTER TABLE data_processing_activity ENABLE TRIGGER ALL;
	ALTER TABLE data_protection_impact_assessment ENABLE TRIGGER ALL;
	ALTER TABLE department ENABLE TRIGGER ALL;
	ALTER TABLE employee ENABLE TRIGGER ALL;
	ALTER TABLE employee_document ENABLE TRIGGER ALL;
	ALTER TABLE gdpr_evaluation ENABLE TRIGGER ALL;
	ALTER TABLE organisation ENABLE TRIGGER ALL;
	ALTER TABLE organisation_logo ENABLE TRIGGER ALL;
	ALTER TABLE request_for_personal_info ENABLE TRIGGER ALL;
	ALTER TABLE severity_evaluating_of_personal_data ENABLE TRIGGER ALL;
EOF
