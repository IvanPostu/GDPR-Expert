-- psql -U postgres -d mydb -a -f "D:\index.sql"

--SELECT employee_document_id, employee_id, file_name FROM app.employee_document;
SELECT d.department_id, e.employee_id FROM app.department AS d 
INNER JOIN app.employee AS e ON e.department_id=d.department_id;
-- SELECT * FROM app.employee;





