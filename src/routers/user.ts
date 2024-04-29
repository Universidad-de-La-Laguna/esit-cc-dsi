import express from 'express';
import { User } from '../models/user.js';
import { Note } from '../models/note.js';

export const userRouter = express.Router();

userRouter.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

userRouter.get('/users', async (req, res) => {
  const filter = req.query.username?{username: req.query.username.toString()}:{};

  try {
    const users = await User.find(filter);

    if (users.length !== 0) {
      return res.send(users);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

userRouter.patch('/users', async (req, res) => {
  if (!req.query.username) {
    return res.status(400).send({
      error: 'A username must be provided',
    });
  }

  const allowedUpdates = ['name', 'username', 'email', 'age'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    const user = await User.findOneAndUpdate({
      username: req.query.username.toString()
    },
    req.body,
    {
      new: true,
      runValidators: true
    });

    if (user) {
      return res.send(user);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

userRouter.delete('/users', async (req, res) => {
  if (!req.query.username) {
    return res.status(400).send({
      error: 'A username must be provided',
    });
  }

  try {
    const user = await User.findOne({
      username: req.query.username.toString()
    });

    if (!user) {
      return res.status(404).send();
    }

    const result = await Note.deleteMany({owner: user._id});

    if (!result.acknowledged) {
      return res.status(500).send();
    }

    await User.findByIdAndDelete(user._id);
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});
