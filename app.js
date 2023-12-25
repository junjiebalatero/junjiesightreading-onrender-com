// Install necessary packages
// npm install express mongoose ejs body-parser

// app.js (main server file)

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB (Make sure you have MongoDB installed and running)
const connect = mongoose.connect('mongodb+srv://junjie:junjie55@junjiecluster.1cawbvg.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp/youtube_clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// check databse connected or not
connect.then(() =>{
  console.log("Database connected Successfully");
})
.catch(() =>{
  console.log("Databse cannot be connected");
});

// Create a simple video model
const Video = mongoose.model('Video', {
  title: String,
  description: String,
  url: String
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  const videos = await Video.find();
  res.render('index', { videos });
});

app.get('/videos/:id', async (req, res) => {
  const video = await Video.findById(req.params.id);
  res.render('video', { video });
});

app.get('/upload', (req, res) => {
  res.render('upload');
});

app.post('/upload', async (req, res) => {
  const { title, description, url } = req.body;
  const video = new Video({ title, description, url });
  await video.save();
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
