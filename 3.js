import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' }
];

app.get('/books', (req, res) => {
    res.send(JSON.stringify(books));
});

app.post('/books', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).send('Both title and author are required.');
    }

    const newBook = {
        id: books.length + 1,
        title,
        author
    };

    books.push(newBook);
    res.status(201).send(`Book added: ${JSON.stringify(newBook)}`);
});

app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;

    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).send('Book not found.');
    }

    if (title) book.title = title;
    if (author) book.author = author;

    res.send(`Book updated: ${JSON.stringify(book)}`);
});

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
        return res.status(404).send('Book not found.');
    }

    const deletedBook = books.splice(index, 1)[0];
    res.send(`Book deleted: ${JSON.stringify(deletedBook)}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});