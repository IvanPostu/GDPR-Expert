#!/bin/bash

backupFileName=$1

if [ "$backupFileName" = "" ]
then 
	echo "ERROR: First argument - migration version is required!!!!"
  echo "Migration version pattern V%d.%d.%d"
  exit 1
else
  if ! (test -a ./$backupFileName); then
    echo "$backupFileName not exist!!!"
    exit 1
  fi
fi

psql -U postgres -d app_db << EOF
	CALL public.turn_off_triggers_for_all_tables_in_schema('app');
EOF

pg_restore -U postgres --dbname=app_db --data-only "./$backupFileName"

psql -U postgres -d app_db << EOF
	CALL public.turn_on_triggers_for_all_tables_in_schema('app');
EOF
