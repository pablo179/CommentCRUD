import express from 'express'
import status from 'http-status'
import cors from 'cors'
import commentsRoute from './routes/comments.route.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// since is only one route we can use directly here
// for more routes we can use and exporter on routes folder
app.use('/comments', commentsRoute);

app.use((_req, res) => {
    res.status(status.NOT_FOUND).send('Not Found');
});

export default app;