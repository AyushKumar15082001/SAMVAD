const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { postRouter } = require('./Routes/posts');
const { userRouter } = require('./Routes/users');
const { authRouter } = require('./Routes/auth');
const { auth } = require('./middlewares/auth');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Database connected") })
    .catch((err) => { console.log(err) })

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));

app.use(cors());
app.use('/api/posts', auth, postRouter);
app.use('/api/user', auth, userRouter);
app.use('/api/auth', authRouter);


//check if the token is valid
app.get('/checkToken',auth,(req,res)=>{
    res.send({message:"token is valid"});
});
// app.use(express.static('client/build'));
// app.use(express.static('public'));

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
}
);