# Build Week Scaffolding for Node and PostgreSQL
URL : https://u4buildweek-marketplace.herokuapp.com/

(When using the register route role_id is defaulted to user role which doesn't have the permission to access certain items route. Check the items table and see whether a owner role is required. Use the listed user to access owner role routes listed down below)

USERS
| Methods | Endpoints           | Description   | Data                         |Note                             |
|--------:|---------------------|---------------|------------------------------|---------------------------------|
|     GET | /api/users          | get all users |                              |                                 |
|    POST | /api/users/register | register user | {username: "", password: ""} |                                 |
|    POST | /api/users/login    | login user    | {username: "", password: ""} |use user2 or user3 for owner role|

ITEMS
| Methods | Endpoints                        | Description                  | Data                                                                                                                         | Note                                                                                                 |
|---------|----------------------------------|------------------------------|------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| GET     | /api/items                       | get all items                |                                                                                                                              | need token                                                                                           |
| GET     | /api/items/category/:category_id | get items by category id     | category_id : integer(1-3)                                                                                                   | need token                                                                                           |
| GET     | /api/items/owner/:owner_id       | get owner items by owner id  | user2 or user3                                                                                                               | need token and owner role, use user2 or user3 from seeds folder, 03-users.js to access this endpoint |
| POST    | /api/items                       | post add item                | {items_name: "", items_description: "", items_price: integer or decimal , items_location : "", category_id: integer(1 to 3)} | need token and owner role                                                                            |
| PUT     | /api/items/:items_id             | put update item by item id   | {items_name: "", items_description: "", items_price: integer or decimal , items_location : "", category_id: integer(1 to 3)} | need token and owner role                                                                            |
| DELETE  | /api/items/:items_id             | delete item by item id       |                                                                                                                              | need token and owner role                                                                            |
<!-- ## Video Tutorial

The following tutorial explains how to set up this project using PostgreSQL and Heroku.

[![Setting up PostgreSQL for Build Week](https://img.youtube.com/vi/kTO_tf4L23I/maxresdefault.jpg)](https://www.youtube.com/watch?v=kTO_tf4L23I) -->

## Requirements

- [PostgreSQL, pgAdmin 4](https://www.postgresql.org/download/) and [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed in your local machine.
- A Heroku app with the [Heroku PostgreSQL Addon](https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-heroku-postgres) added to it.
- Development and testing databases created with [pgAdmin 4](https://www.pgadmin.org/docs/pgadmin4/4.29/database_dialog.html).

## Starting a New Project

- Create a new repository using this template, and clone it to your local.
- Create a `.env` file and follow the instructions inside `knexfile.js`.
- Fix the scripts inside `package.json` to use your Heroku app.

## Scripts

- **start**: Runs the app.
- **server**: Runs the app with Nodemon.
- **migrate**: Migrates the local development database to the latest.
- **rollback**: Rolls back migrations in the local development database.
- **seed**: Truncates all tables in the local development database, feel free to add more seed files.
- **test**: Runs tests.
- **deploy**: Deploys the main branch to Heroku.

**The following scripts NEED TO BE EDITED before using: replace `YOUR_HEROKU_APP_NAME_HERE`**

- **migrateh**: Migrates the Heroku database to the latest.
- **rollbackh**: Rolls back migrations in the Heroku database.
- **databaseh**: Interact with the Heroku database from the command line using psql.
- **seedh**: Runs all seeds in the Heroku database.

## Hot Tips

- Figure out the connection to the database and deployment before writing any code.

- If you need to make changes to a migration file that has already been released to Heroku, follow this sequence:

  1. Roll back migrations in the Heroku database
  2. Deploy the latest code to Heroku
  3. Migrate the Heroku database to the latest

- If your frontend devs are clear on the shape of the data they need, you can quickly build provisional endpoints that return mock data. They shouldn't have to wait for you to build the entire backend.

- Keep your endpoints super lean: the bulk of the code belongs inside models and other middlewares.

- Validating and sanitizing client data using a library is much less work than doing it manually.

- Revealing crash messages to clients is a security risk, but during development it's helpful if your frontend devs are able to tell you what crashed.

- PostgreSQL comes with [fantastic built-in functions](https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql) for hammering rows into whatever JSON shape.

- If you want to edit a migration that has already been released but don't want to lose all the data, make a new migration instead. This is a more realistic flow for production apps: prod databases are never migrated down. We can migrate Heroku down freely only because there's no valuable data from customers in it. In this sense, Heroku is acting more like a staging environment than production.

- If your fronted devs are interested in running the API locally, help them set up PostgreSQL & pgAdmin in their machines, and teach them how to run migrations in their local. This empowers them to (1) help you troubleshoot bugs, (2) obtain the latest code by simply doing `git pull` and (3) work with their own data, without it being wiped every time you roll back the Heroku db. Collaboration is more fun and direct, and you don't need to deploy as often.
