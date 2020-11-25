#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER app_user;
    CREATE DATABASE app_db;
    CREATE DATABASE app_db_test;
    GRANT ALL PRIVILEGES ON DATABASE app_db TO app_user;
    GRANT ALL PRIVILEGES ON DATABASE app_db_test TO app_user;
EOSQL


