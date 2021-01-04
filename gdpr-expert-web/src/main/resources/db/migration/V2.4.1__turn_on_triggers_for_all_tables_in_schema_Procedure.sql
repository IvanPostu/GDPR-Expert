CREATE PROCEDURE public.turn_on_triggers_for_all_tables_in_schema(schema_name_arg VARCHAR(128))
LANGUAGE plpgsql
AS $$
DECLARE
	rw pg_catalog.pg_tables%rowtype;
	sql1 VARCHAR(256);
BEGIN
    FOR rw IN
        SELECT * FROM pg_catalog.pg_tables WHERE schemaname=schema_name_arg
    LOOP
    	sql1=concat('ALTER TABLE ', schema_name_arg, '.', rw.tablename, ' ENABLE TRIGGER ALL ') ;
		EXECUTE sql1;
    	RAISE NOTICE '%', sql1;
    END LOOP;
END; $$

