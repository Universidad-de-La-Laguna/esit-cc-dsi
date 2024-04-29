import express from 'express';
import './db/mongoose.js';
import { noteRouter } from './routers/note.js';
import { userRouter } from './routers/user.js'
import { defaultRouter } from './routers/default.js';

export const app = express();
app.use(express.json());
app.use(noteRouter);
app.use(userRouter);
app.use(defaultRouter);
