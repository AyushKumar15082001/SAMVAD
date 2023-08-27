const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { postRouter } = require('./Routes/posts');
const { userRouter } = require('./Routes/users');
const { authRouter } = require('./Routes/auth');
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
app.use('/user', userRouter);
app.use('/auth', authRouter);
// app.use(express.static('client/build'));
// app.use(express.static('public'));

app.listen(port, () => {
    console.log(`app listening at h
    ttp://localhost:${port}`);
}
);