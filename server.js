const express = require('express');
const mongoose = require('mongoose');
const api = require('./routes');

const app = express();

// to be able to upload the project to Heroku app
let conn = process.env.ATLAS;
// if no connection set to local
if (conn == null || conn == "") {
  conn = 'mongodb://localhost:27017/taskapp';
}

// min atributes needed to connect to mongo atlas
mongoose.connect(conn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: 'taskapp'
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to mongo'));

// for sending and recieving data in json format
app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);
app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

// for setting the port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => console.log("Server is listening on port %s", port));
