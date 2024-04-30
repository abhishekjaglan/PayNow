const express = require("express");
const { connectDb } = require("./database/db");
require("dotenv").config();
const rootRouter = require('./routes/index')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3005;

connectDb();
app.use(cors());
app.use(express.json());

app.use('/api', rootRouter);

app.listen(PORT, ()=>{
    console.log(`Backend server running at port ${PORT}!`);
});