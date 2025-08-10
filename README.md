# Books REST API

A simple REST API built using **Node.js** and **Express** to manage a list of books stored in a JSON file.

## Features

- Retrieve all books (GET /books)
- Retrieve a single book by ID (GET /books/:id)
- Add a new book (POST /books) with `title`, `author`, and `category`
- Update an existing book by ID (PUT /books/:id)
- Delete a book by ID (DELETE /books/:id)
- Persistent storage of books in `book_data.json`

## What I Did

- Initialized the project with `npm init` and installed Express.
- Set up a basic Express server running on port 3000.
- Created helper functions to read and write books to a JSON file for persistence.
- Implemented RESTful endpoints for full CRUD operations:
  - GET `/books` to fetch all books.
  - GET `/books/:id` to fetch a book by ID.
  - POST `/books` to add a book, validating required fields (`title`, `author`, `category`).
  - PUT `/books/:id` to update a book, with validation.
  - DELETE `/books/:id` to remove a book by ID.
- Used Express middleware to parse JSON request bodies.
- Added proper error handling and status codes for missing books or invalid data.
- Tested all endpoints with Postman.