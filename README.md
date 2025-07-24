# RecBlog

I started RecBlog as well as a way to make myself more familiar with the frontend side of Full Stack using NextJS, Mantine and TailwindCSS.

The backend part of this project can be found in [this repository](https://github.com/rsresta07/kathanika-blog-backend).

There may be a lot of things I have made mistake and a lot of things that I may be able to improve. I will leave it to future [Rameshwor](https://github.com/rsresta07) ahaha...

## Table of Content

- [RecBlog](#recblog)
  - [Table of Content](#table-of-content)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Project Setup](#project-setup)
  - [Run Locally](#run-locally)
  - [Environment Variables](#environment-variables)
  - [Usage/Examples](#usageexamples)
    - [API Reference](#api-reference)
    - [Screenshots](#screenshots)
  - [Project Structure](#project-structure)
  - [Documentation](#documentation)
    - [Initial Plan](#initial-plan)
  - [Developer Notes](#developer-notes)
    - [2025-07-24](#2025-07-24)
  - [Roadmap](#roadmap)
  - [Known Issues](#known-issues)
  - [License](#license)
  - [Authors](#authors)
  - [Reference](#reference)

## Features

- Content Based Filtering (cosine similarity + Inverse Frequency)
- Collaborative Filtering (User-Based)
- Authentication
- Follow, Like and Comment

## Tech Stack

**Client:** NextJS (Page Router), TailwindCSS, Mantine

**Server:** Nestjs, TypeORM, Postgres

## Installation

## Project Setup

```bash
# install dependencies
$ yarn install
```

## Run Locally

```bash
# development
$ yarn run start

# watch mode
$ yarn dev

# production mode
$ yarn run start:prod
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

```bash
NEXT_PUBLIC_API_BASE_URL = YOUR_API_BASE_URL

NEXT_PUBLIC_CLOUDINARY_CLOUD = YOUR_CLOUDINARY_CLOUD
NEXT_PUBLIC_CLOUDINARY_PRESET = YOUR_CLOUDINARY_PRESET

```

## Usage/Examples

### API Reference

### Screenshots

## Project Structure

Inside the src/ there is multiple folder so below is the brief explaination of it.

```bash
src/
    api/
    components/
        common/
        modals/
        modules/
    config/
    layouts/
    pages/
    plugins/
    styles/
    utils/
        helpers/
        hooks/
        lib/
        mock/
```

**api/**

- The api/ folder consist of all the api routes from the backend with each file for the functions.

**components/**

- **common/** - common/ folder consist of all the common components that is used in the project, it contents modules, section, function and even components.
- **modals/** - modals/ folder consist of all the modals used in the project.
- **modules/** - it contains all the modules and sections of the project to make the pages/ file modular.

**layouts/**

- it has layouts for the user side and admin side.

**utils/**

- **helpers/** - this has helper functions that can/are common in multiple files.
- **hooks/** - contains custom React hooks written by me.
- **helpers/** - contains helper functions

## Documentation

### Initial Plan

The initial plan for RecBlog was to have users who can login and register, they can read other users blogs while also add their own blogs. The blog itself is not that fancy: title, cover image, tags, content of the blog, likes, comment and follow.

So, RecBlog is a multiple user blogging platform that consist of two algorithms. Content-based filtering (`cosine similarity` + `Term Frequency–Inverse Document Frequency` inspired `Inverse Frequency`) and Collaborative filtering (User-based filtering - _will be explained later on_).

You know basic stuff _but_ it to be fully production ready project!

One of the main reason why I wanted to create a complete simple production ready web application is because, I had realized I have never created personal project that is complete haha..

So enough chitchat and lets go deeper into this project in which I know i have messed up a lot of things.

For detailed developer notes, see [docs/developer-notes.md](./docs/developer-notes.md)

## Developer Notes

### 2025-07-24

Its been three months the project has started, I have been doing this on and off. At the time of write this, I do have personal docs for this project but its to messy. But its been to be late than never, I guess.

## Roadmap

- Additional browser support
- Add more integrations

## Known Issues

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [@rsresta07](https://www.github.com/rsresta07)

## Reference

- The UI was reference from Figma Community. [link here](https://www.figma.com/proto/r19t6yYbD7IICxLFK4tQqT/The-Blog---A-Web-Personal-Blog--Community-?node-id=614-679&starting-point-node-id=614%3A679&show-proto-sidebar=1&t=qbZKgvjOyJU2kww9-1)
