# Jam-Practice
Web app with flash cards designed especially for musicians.

Tech specs:
* A React frontend, a Node/express backend, and a mySQL database- all dockerized
* Auth: login, registration, roles, and authenticated requests to the backend
* A "my account" page to view and modify the current user
* An admin-only page to view and modify users
* Postman testing for the backend API
* Local deployment with docker-compose 


# Local development
TL;DR: Type `make`, wait a couple minutes, then go to `localhost:3000` in your brower.

```bash
# Runs all containers in a local docker-compose.
#
# By default, the frontend will run on localhost:3000 and can be accessed via a web browser.
# Since it has hot-reloading so you won't need to rebuild the container to test changes.
#
# By default, the backend will run on localhost:8080 and can be accessed via via curl, Postman, etc.
# You will need to rebuild the container by running `make local-rt` in order to tests changes.
#
# You can also just type `make` as this is the default Makefile target.
make local-rt

# Takes down any currently running containers
make local-rt-down

# Resets local environment and volumes
make clean

# Indiscriminately annihilates local docker data, including things you have from other projects.
# USE WITH CAUTION
make nuke

# Default command for mucking around in the db container
docker exec -it db mysql -u root -p=123456 testdb
```

# Testing
There is a suite of Postman tests in `tests/`. These assume that the database has been freshly initialized and contains no additional data.

To run tests locally:
```bash
make local-rt
make api-tests # In another terminal
```

To make changes to the tests, import the collection `tests/postman-collections/myern-app-tests.postman_collection.json` and the env file `tests/postman-collections/myern-app-local-env.postman_environment` into Postman, make changes, and export.


# API
| URL | Verb | Parameter(s) | Permissions | Description |
| - | - | - | - | - |
| /api/auth/register | POST | request.body <ul><li>`username` (string) A username that isn't already taken</li><li>`email` (string) An email that isn't already taken</li><li>`password` (string)</li></ul> | | Register a new user |
| /api/auth/login | POST | request.body <ul><li>`username` (string)</li><li>`password` (string)</li></ul> | | Login |
| /api/user/myaccount | GET | | User | Get the currently logged in user's attributes |
| /api/user/myaccount/update | POST | request.body<ul><li>`username` (string, optional) A username that isn't already taken</li><li>`email` (string, optional) An email that isn't already taken</li><li>`password` (string, optional)</li></ul> | User | Update the currently logged in user's attributes |
| /api/admin/users/:id | GET | | Admin | Get the user with the matching ID |
| /api/admin/users/:id | DELETE | | Admin | Delete a user |
| /api/admin/users/:id/update | POST | request.body <ul><li>`username` (string, optional) A username that isn't already taken</li><li>`email` (string, optional) An email that isn't already taken</li><li>`role` (user.role enum defined in backend/models/user.model.js, optional)</li></ul> | Admin | Update a user's attributes |
| /api/admin/users/ | GET | URL<ul><li>`criteria` (string, optional): Search criteria; will only return users whose usernames contain this string</li><li>`page` (int) Page number</li><li>`size` (int) Page size</li></ul> | Admin | Returns a list of all users, which can optionally be searched and/or paginated


# Environment Variables
## Backend
| Name | Default Value | Description |
| --- | --- | --- |
| DB_HOST | db | Hostname of the database container |
| DB_DB | testdb | The database being used |
| DB_USER | root | Database user |
| DB_PASSWORD | 123456 | Database password |
| DEV_RESET_DB | false | If true, the database will be re-initialized on startup. Use for development if you don't want the db to persist. |

## Frontend
Frontend variables are actually provided as Docker build args, not environment variables. This is so that React compiles their values at build time.

| Name | Default Value | Description |
| --- | --- | --- |
| REACT_APP_API_HOST | localhost | Hostname of the API container |
| REACT_APP_API_PORT  | 8080 | Port of the API container |
| REACT_APP_DEV_DEBUG_MODE | false | If true, the frontend will operate in debug mode, logging each http request and response it handles in default. |

## Database
The database is a stock mySQL container. You're an adult and you know how to Google their [documentation](https://dev.mysql.com/doc/refman/5.7/en/environment-variables.html). That being said, here are some variables of note.

| Name | Default Value | Description |
| --- | --- | --- |
| MYSQL_HOST | | The default host name used by the mysql command-line client. |
| MYSQL_ROOT_PASSWORD | | Password for the user "root". This variable is mandatory and has no default value. |


# Authentication
## Role
| Role | Inherited role(s) | Permissions | 
| - | - | - |
| Admin | User, Moderator | an access admin and development endpoints |
| Moderator | User | |
| User | | |

## Defaults
New users created through `/api/auth/signup` are given the role of user.

An admin user is created at startup, whose credentials (by default `admin:admin`) can be altered in `backend/config/auth.config.js`.

# Misc
## Known bugs
* User with the same username can be registered repeatedly; the API will return an error but the duplicate user will still be created and appear in a "get all users" query.
* The above bug applies to any action to the api. the api will returns an error but still perform the aciton. this allows for the creates/updates of duplicate usernames, emails
* On a fresh machine, user needs to run `npm i --save @fortawesome/free-solid-svg-icons` or the frontend doesn't compile

## TODO
* Buy the domain jam-practice.com
* Consistent button sizes
* Automated Postman testing
* Migrate backend from npm to yarn
* Add reset db api targer, make tests run it
* update test image to include dependencies