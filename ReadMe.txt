#Introduction about how to setup and use

1. Install Node.js and npm

2. Install Postgresql and start

3. Configure Postgresql and create DB tuv for postgres:

#Create Table
CREATE TABLE company (id int primary key, name text, data real);

#Create Function 
CREATE OR REPLACE FUNCTION notify_trigger() RETURNS trigger AS $$ DECLARE BEGIN PERFORM pg_notify('watchers', '{id:' || NEW.id || ',name:' || NEW.name || ',data:' || NEW.data); RETURN new; END; $$ LANGUAGE plpgsql;

#Create Trigger to monitor the data Insert action for table company
CREATE TRIGGER watched_table_trigger AFTER INSERT ON company FOR EACH ROW EXECUTE PROCEDURE notify_trigger();

4. Install pg node pageack: 
npm install pg

5. Run post_watcher.js
ndoe post_watcher.js

6.Try to insert data for testing

