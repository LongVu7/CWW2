require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser')

// global.Vocab = require('./api/models/vocabModel');
// const routes = require('./api/routes/vocabRoutes');



mongoose.Promise = global.Promise;
// mongoose.set('useFindAndModify', false);
mongoose.connect(
  'mongodb://localhost:27017/vocab-builder',
  // { useNewUrlParser: true }
);

const app = express();
// const port = process.env.PORT || 3000;
const port = 3000;


app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser())


require('./api/models/userModel');
require('./api/models/vocabModel');
const authRoutes = require('./api/routes/authRoute');
const vocabRoutes = require('./api/routes/vocabRoutes');

app.use('/api/auth', authRoutes); 
app.use('/api/words', vocabRoutes);
  
// routes(app);

app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);
