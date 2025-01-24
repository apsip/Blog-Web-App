const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = [];

app.get('/', (req, res) => {
  
  const { success } = req.query;
  res.render('home', { success: success || null, posts });
  
});

app.post('/submit-comment', (req, res) => {
  const { name, email, comment } = req.body;
  console.log(`Name: ${name}, Email: ${email}, Comment: ${comment}`);

  res.redirect('/?success=' + encodeURIComponent('Post Successful!'));
  posts.push({name, comment});
});

// Handle post deletion
app.post('/delete-post', (req, res) => {
  const { index } = req.body;
  posts.splice(index, 1); // Remove the post at the given index
  res.redirect('/?success=' + encodeURIComponent('Post Deleted!'));
});

// Handle post editing
app.post('/edit-post', (req, res) => {
  const { index, comment } = req.body;
  posts[index].comment = comment; // Update the comment at the given index
  res.redirect('/?success=' + encodeURIComponent('Post Updated!'));
});


app.get('/archive', (req, res) => {
  res.render('archive'); 
});

app.get('/about', (req, res) => {
  res.render('about'); 
});

app.get('/contact', (req, res) => {
  res.render('contact'); 
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
