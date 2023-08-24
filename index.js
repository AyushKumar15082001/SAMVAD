const express = require('express');
const { getPosts, createPost, updatePost, deletePost } = require('./Controllers/posts');
const app = express();
const port = 3000;

app.use(express.json());

//get posts
app.get('/posts', getPosts);

//create posts
app.post('/posts', createPost);

//update posts
app.patch('/posts/:id', updatePost);

//delete posts
app.delete('/posts/:id', deletePost);

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
    }
);