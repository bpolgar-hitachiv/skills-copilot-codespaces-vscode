// Create web server
// 1. Create a web server
// 2. Load the comments.json file
// 3. Create a route for the root URL
// 4. Create a route for the /comments URL
// 5. Create a route for the /comments/:id URL
// 6. Start the server

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const COMMENTS_FILE = './comments.json';

// Load the comments.json file
function loadComments() {
  return JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf8'));
}

// Save the comments to the comments.json file
function saveComments(comments) {
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 4));
}

// Create a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Create a route for the /comments URL
app.get('/comments', (req, res) => {
  const comments = loadComments();
  res.json(comments);
});

// Create a route for the /comments/:id URL
app.get('/comments/:id', (req, res) => {
  const comments = loadComments();
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

// Create a route for the /comments URL
app.post('/comments', (req, res) => {
  const comments = loadComments();
  const comment = {
    id: comments.length + 1,
    name: req.body.name,
    message: req.body.message,
    };
    comments.push(comment);
    saveComments(comments);
    res.json(comment);
}
);