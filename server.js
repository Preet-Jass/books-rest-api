const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

let books = require('./book_data.json');
const { error } = require('console');

//Save changes to JSON
function saveBooks() {
    fs.writeFileSync('./book_data.json', JSON.stringify(books, null, 2));
}

function getBook(id) {
    const bookId = parseInt(id);
    return books.find(b => b.id === bookId) || null;
}

function getBookIndex(id) {
    const bookId = parseInt(id);
    return books.findIndex(b => b.id === bookId);
}

//GET Route
app.get('/', (req, res) => {
    res.send("RESTAPI to manage books.");
});

app.get('/books', (req, res) => {
    res.send(books);
});

app.get('/books/:id', (req, res) => {
   const book = getBook(req.params.id);

   if(!book) {
    return res.status(404).json({
        message: 'Book not found'
    });
   }

   res.json(book);
});


//POST route - add a new book
app.post('/books', (req, res) => {
    const { title, author, category } = req.body;

    if(!title || !author || !category) {
        return res.status(400).json({
            error: 'Title, author, and category are required.'
        });
    }

    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title, 
        author,
        category 
    };

    books.push(newBook);
    saveBooks();

    res.status(201).json(newBook);
});

//PUT Route Update a book by id
app.put('/books/:id', (req, res) => {
    const book = getBook(req.params.id);
    
    if(!book) {
        return res.status(404).json({
            error:'Book not found'
        });
    }

    const { title, author, category } = req.body;

    if(!title || !author || !category) {
        return res.status(400).json({
            error: 'PLease provide title, author and category to update.'
        });
    }

    book.title = title;
    book.author = author;
    book.category = category;

    saveBooks();

    res.status(200).json({
        message: "Book updated successfully", 
        book: book
    });
});

app.delete('/books/:id', (req, res) => {
    const book = getBook(req.params.id);

    if(!book) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }

    const index = getBookIndex(req.params.id);
    books.splice(index, 1);

    saveBooks();

    res.status(200).json({
        message: 'Book deleted successfully'
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});