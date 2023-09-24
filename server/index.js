const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const { postRouter } = require(path.resolve(__dirname, 'Routes', 'posts'));
const { userRouter } = require(path.resolve(__dirname, 'Routes', 'users'));
const { authRouter } = require(path.resolve(__dirname, 'Routes', 'auth'));
const {actionRouter} = require(path.resolve(__dirname, 'Routes', 'actions'));
const { auth } = require(path.resolve(__dirname, 'Middlewares', 'auth'));
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Database connected") })
    .catch((err) => { console.log(err) })

app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.resolve(__dirname, 'build')));

app.use(cors());
app.use('/api/posts', auth, postRouter);
app.use('/api/user', auth, userRouter);
app.use('/api/auth', authRouter);
app.use('/api/actions', auth, actionRouter);

// check if the token is valid
app.get('/api/checkToken', auth, (req, res) => {
    try {
        res.send({ message: "token is valid" });
    } catch (err) {
        res.sendStatus(401);
    }
});

// app.get('/*', (req, res)=> {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
}
);