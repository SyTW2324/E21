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
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/user', userRouter); 
app.use('/movies', moviesRouter);
app.use('/series', seriesRouter);
app.use('/comments', commentsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
