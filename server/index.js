const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { postRouter } = require('./Routes/posts');
const { userRouter } = require('./Routes/users');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Database connected") })
    .catch((err) => { console.log(err) })

app.use(express.json());
app.use(cors());
app.use('/posts', postRouter);
app.use('/users', userRouter);
// app.use(express.static('public'));

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
}
);