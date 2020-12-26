-- psql -U postgres -d mydb -a -f "D:\index.sql"


-- BEGIN
--   IF ((SELECT current_database())='app_db_test') THEN
--     \echo "HERE YOUR DEBUG MSG!"
--   END IF;
-- END;


DO
$do$
BEGIN
  IF (SELECT current_database())='app_db_test' THEN
    RAISE NOTICE 'Hello';
  END IF;
END
$do$



