# Typescript Boilerplate with MongoDB

to run server with dev settings use `npm run start:dev`

build server with `npm run build`

start server with `npm start`

start test with `npm run test`

# Features

- Basic authentication with **jwt** and **bcrypt** (login, register)
- Basic document creation using MongoDB as database with **mongoose**
  > **_IMPORTANT_!** configure .env from .env.example to connect with your mongoose database
- Basic file handling with **multer**
- Basic pdf filler with **pdf-lib**
- Unit testing with **mocha** and **chai**
- Separate configuration for development, testing, and staging environment
- Logging formatter with **pino**

# Notes:

## Mongoose Middleware vs Express Middleware

Mongoose middleware:  
`schema.pre()`

- Hooks, to apply multiple database queries
- DO NOT use arrow functions

Express middleware:  
`app.use()`

- Standard middleware, to procces the req/res data

## Layers in the server

> Italics are optional

[HTTP Endpoint] &rlarr; _[Middleware]_ &rlarr; [Controller] &rlarr; [Service] &rlarr; _[Mongoose Hooks]_ &rlarr; [Database]

Functionalities of each folder:
Folder Name | Description | Functionalities
------------|-------------|----------------
config | Constants for server configuration | declaring database url, environment, etc
constants | Reusable constants | Declaring constants that'll be used repeatedly
middlewares | Express middlewares | req/res preprocessing(?), e.g. jwt/cookie authentication, session validation, etc
routes | All API routes | All routes and their respective middleware and callbacks
controller | Layer between _HTTP Request_ (or _middleware_) and services | Interface for handling req/res before sending it to worker (services)
services | API worker | All necessary operations before/after querying to database, make sure to THROW any errors, logging are optional whether you want to log it on controller or service for better debugging
interfaces | Typing for mongoose schema | Interface for typescript's typing to mongoose schemas
utils | functions to support services | All functions that can be separated from services to make it modular
models | field attribute of database schema | All hooks and schema structure will be defined here, e.g. whether if a field is required or not, reference to other models, etc

## Tips to create an endpoint

1. Create interface
   > It is recommended to match interface with database attributes to provide consistency of data type, add more interface to improve consistency between data types
1. Create services
   > a. Create services according to what the worker will do, it is recommended to create workers with single responsibility and reuse them later on
   > b. Handle missing parameter and parameter types, you can use interface to simplify this process
1. Create models
   > Create schema model accordingly, use Object id if it needs some kind of "relationship" between collection
1. Create controller
   > a. Handle request parameters and error handling (req/res)
   > b. If possible, do not pass whole request body to services, it is better to validate each of the request and pass them to services accordingly
1. Create route
   > Define "parent" route on index.ts and define its subroute on another file
1. (opsional) Create middleware
   > Call middlewares before controller (in routes)
1. Test API

- Don't forget to use logging and import logging from utils. If necessary, you can rename the logger to something else to avoid conflict with autocomplete (there are other "Logger")
