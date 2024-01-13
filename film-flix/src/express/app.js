import express from 'express';
import cors from 'cors';
import '../services/db.js';

import userRouter from './user.js';
import moviesRouter from './movies.js';
import seriesRouter from './series.js';
import commentsRouter from './comments.js';

const app = express()
const PORT_WEB = 3001
let port = 3000

if (process.env.NODE_ENV === 'production') {
  port = PORT_WEB
}

const corsOptions = {
  origin: `http://localhost:${port}`,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/user', userRouter); 
app.use('/api/movies', moviesRouter);
app.use('/api/series', seriesRouter);
app.use('/api/comments', commentsRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));

  app.get('*', (req, res) => {
    res.sendFile('build/index.html', { root: '.' });
  });
}

app.listen(PORT_WEB, () => {
  console.log(`Example app listening on port ${PORT_WEB}`)
})