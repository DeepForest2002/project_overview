//Postgresql database schema design
//relational db = stores data in the form of tables and they are connected via diff diff relationships

1 post = 1 comment
1 user = many post

//non relational db= does't organize data using connected tables they use documents or key value pairs to store any kind of data

//when relational db are a good choice ?
=> when we want to implement transaction, joins. where data has a proper structure and relationships among them and we want strong validation at db level

// non relational= where data changes very often, when docs are independent, you dont use that much of a join query and you want your data to be horizontally scaled.

//create a new db= create new database if not exists db_name
// drop databse if exists db_name - you should never do it for a prod application

//install dbmate and run npx dbmate new creater_user_table for creating db/migrations/create_user_table on the root folder

//using cli use postgres =>

//schema=> create schema if not exists basics => Folder inside db
//extension = create extension if not exists pgcrypto

// query to get all schema names => select schema_name from information_schema.schemata order by schema_name

// how to create table = students table (table lives inside the schema)
CREATE TABLE schema_name.table_name (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

//dataTypes
Integer (Whole number), bigint (whole number larger than int), numeric(10,2) total 10 digits and 2 digits after decimal

// other data types
