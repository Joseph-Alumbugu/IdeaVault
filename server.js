const express = require('express');
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db.js')
const path = require('path')
const port = process.env.PORT

connectDB()
const app = express();

//static folder
app.use(express.static(path.join(__dirname,'public')))

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(cors({
  origin:['http://localhost:5000','http://localhost:3000','http://127.0.0.1:5500'],
  credentials:true 
}))

app.get('/', (req, res) => {
  res.send({ 'messages':'Welcome to the Randdom ideas API'});
});

const ideasRouter = require('./routes/ideas.js')
app.use('/api/ideas', ideasRouter)

try {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
} catch (error) {
   console.log
}

