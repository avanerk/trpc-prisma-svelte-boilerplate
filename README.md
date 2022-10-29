# tRPC, Prisma, Svelte boilerplate

Simple boilerplate that I use for my own projects.

Note: This boilerplate in its current state is pretty barebones, user authentication and authorization would be nice to add to this boilerplate.
Feel free to contribute to this project.

Currently working on:

- User authentication and authorization
- DB seeder
- Route generator scripts

## Getting started

To get started, run the folling commands:

`npm install`

### Prepare the database

`npx prisma init`

#### Set your database type

Set the database type in `prisma/schema.prisma`

#### Database settings

Copy the `.env.example` to `.env` and set your DB configuration accordingly

#### Push your schema to the database 

run `npx prisma db push`

And you're ready to go 😎

## Contributing

Feel free to contribute to this project.
