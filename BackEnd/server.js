const express = require('express')
const app = express()
const port = 4000; // Port that will be used

// Use body-parser for POST method
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//server.js
//add just under import section at the top of server,js
// Serve the static files from the React app
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));


// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://adminadmin:adminadmin@cluster0.g7sn3k5.mongodb.net/MyDatabase?retryWrites=true&w=majority');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// The schema of bookSchema
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
});

const bookModel = mongoose.model('my_books', bookSchema) // Add to the bookSchema

// Find book by id and delete it from the database
app.delete('/api/book/:id', async(req, res) =>{

   console.log("Delete: " + req.params.id);

   let book = await bookModel.findByIdAndDelete(req.params.id); // Find book by id and delete it from the database
   res.send(book); // Will not ecxecute unitl book has been deleted
})

// Find book by id and update it based on the values the user submitted
app.put('/api/book/:id', async(req, res) =>{

    console.log("Update: " + req.params.id);

    let book = await bookModel.findByIdAndUpdate(req.params.id, req.body, {new:true}); // Find book by id and update it based on the values the user submitted
    res.send(book); // Will not send until book has been found
})

// Route point that sends 'Hello World!' when passed /
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Route point that sends the new book when passed /api/book
app.post('/api/book', (req, res)=>{
    console.log(req.body);

    // Create new book and set attributes
    bookModel.create({
        title:req.body.title,
        cover:req.body.cover,
        author:req.body.author
    })
    .then(()=>{res.send('Book created')}) // Callback function
    .catch(()=>{res.send('Book NOT created')}); // Callback function

   // res.send("Data Recieved!");
})

app.get('/api/book/:identifier', async (req,res)=>{
    console.log(req.params.identifier);

    let book = await bookModel.findById(req.params.identifier); // // Asynchronus MongoDB command to book by id
    res.send(book);
})

// Route point that sends the books JSON when passed /api/books
app.get('/api/books', async(req, res)=>{

    let books = await bookModel.find({}); // Asynchronus MongoDB command to get all of the books in the database
    res.json(books);
})

//add at the bottom just over app.listen
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../build/index.html'));
    });
    

// Listen on the selected port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})