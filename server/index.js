const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const postsRoute = require('./routes/Posts');
const communityRequestsRoutes = require('./routes/requestCommunity');
// const connection = require("./db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const deletePostRoutes = require("./routes/PostDelete"); 

require('dotenv/config');

const app = express();

//Used with React!
app.use(cors({
}));
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// routes
app.use(postsRoute);
app.use(userRoutes);
app.use(authRoutes);
app.use(communityRequestsRoutes);
app.use(deletePostRoutes);

app.use('/profileImages', express.static("profileImages"))

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'InteroDataBase' //Collection Name
}).then(() => {
    console.log("Connected to the DB");
})
.catch((err) => {
    console.log("No Connection. Error:" + err);
})

// database connection
// connection();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { console.log('Server started on port', PORT)})