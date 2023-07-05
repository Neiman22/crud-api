# Assignment: CRUD API

## Description

Implemented simple CRUD API using in-memory database underneath.

## Technical requirements

- Typescript used
- `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `ts-node-dev` used
- Node.js v18.12.1 used

## Implementation details

1. Implemented endpoint `api/users`:
    - **GET** `api/users` is used to get all persons
        - Server responds with `status code` **200** and all users records
    - **GET** `api/users/{userId}` 
        - Server responds with `status code` **200** and record with `id === userId` if it exists
        - Server responds with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server responds with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **POST** `api/users` is used to create record about new user and store it in database
        - Server responds with `status code` **201** and newly created record
        - Server responds with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    - **PUT** `api/users/{userId}` is used to update existing user
        - Server responds with` status code` **200** and updated record
        - Server responds with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server responds with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **DELETE** `api/users/{userId}` is used to delete existing user from database
        - Server responds with `status code` **204** if the record is found and deleted
        - Server responds with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server responds with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
2. Users are stored as `objects` that have following properties:
    - `id` — unique identifier (`string`, `uuid`) generated on server side
    - `username` — user's name (`string`)
    - `age` — user's age (`number`)
    - `hobbies` — user's hobbies (`array` of `strings` or empty `array`)
3. Requests to non-existing endpoints are handled (server responds with `status code` **404** and 'Endpoint not found' message)
4. Errors on the server side that occur during the processing of a request are handled and processed correctly (server responds with `status code` **500** and corresponding 'Internal server error' message)
5. Value of `port` on which application is running is stored in `.env` file
6. Implemented 2 modes of running application (**development** and **production**):
    - The application is run in development mode using `nodemon` or `ts-node-dev` (there is a `npm` script `start:dev`)
    - The application is run in production mode (there is a `npm` script `start:prod` that starts the build process and then runs the bundled file)
