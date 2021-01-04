#!/bin/bash

migrationVersion=$1

if [ "$migrationVersion" = "" ]
then 
	echo "ERROR: First argument - migration version is required!!!!"
  echo "Migration version pattern V%d.%d.%d"
  exit 1
fi

backupFileName=""$migrationVersion"__`date +"%Y-%m-%dT%T"`.backup.tar"

# Delete if file with the same name exists.
if (test -a ./$backupFileName); then
	rm ./$backupFileName
fi

pg_dump -U postgres -F t --exclude-table=flyway_schema_history app_db > "./$backupFileName"

if (($? == 0)); then
	echo "Backup file with name $backupFileName created with success."
fi

