import express from 'express';
import cors from 'cors';
import '../services/db.js';

import userRouter from './user.js';
import moviesRouter from './movies.js';
import seriesRouter from './series.js';
import commentsRouter from './comments.js';

const app = express()
const port = 3001

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/user', userRouter); 
app.use('/api/movies', moviesRouter);
app.use('/api/series', seriesRouter);
app.use('/api/comments', commentsRouter);

app.use(express.static('build'));

app.get('*', (req, res) => { 
  res.sendFile('build/index.html', { root: '.' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})