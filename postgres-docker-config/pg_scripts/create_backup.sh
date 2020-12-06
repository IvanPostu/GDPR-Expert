#!/bin/bash


if (test -a ./app_db.tar); then
	rm ./app_db.tar
fi

pg_dump -U postgres -F t --exclude-table=flyway_schema_history app_db > ./app_db.tar

if (($? == 0)); then
	echo "Backup file created with success."
fi

