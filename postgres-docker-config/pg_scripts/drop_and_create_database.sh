#!/bin/bash



psql -U postgres -d postgres << EOF
	DROP DATABASE IF EXISTS app_db; 
	DROP DATABASE IF EXISTS app_db_test; 

	CREATE DATABASE app_db;
	CREATE DATABASE app_db_test;
EOF

