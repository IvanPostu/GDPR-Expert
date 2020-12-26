
CREATE VIEW app.user_info AS
SELECT u.user_id, u.active, u.email FROM app.user AS u;
