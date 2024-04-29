import express from 'express';
import serverless from 'serverless-http';
import './db/mongoose.mjs';
import { noteRouter } from './routers/note.mjs';
import { userRouter } from './routers/user.mjs'
import { defaultRouter } from './routers/default.mjs';

export const app = express();
app.use(express.json());
app.use(noteRouter);
app.use(userRouter);
app.use(defaultRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

export const handler = serverless(app);
