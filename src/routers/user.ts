import express from 'express';
import { User } from '../models/user.js';
import { Note } from '../models/note.js';

export const userRouter = express.Router();

userRouter.post('/users', (req, res) => {
  const user = new User(req.body);

  user.save().then((user) => {
    res.status(201).send(user);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

userRouter.get('/users', (req, res) => {
  const filter = req.query.username?{username: req.query.username.toString()}:{};

  User.find(filter).then((users) => {
    if (users.length !== 0) {
      res.send(users);
    } else {
      res.status(404).send();
    }
  }).catch((error) => {
    res.status(500).send(error);
  });
});

userRouter.patch('/users', (req, res) => {
  if (!req.query.username) {
    res.status(400).send({
      error: 'A username must be provided',
    });
  } else {
    const allowedUpdates = ['name', 'username', 'email', 'age'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      User.findOneAndUpdate({username: req.query.username.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((user) => {
        if (!user) {
          res.status(404).send();
        } else {
          res.send(user);
        }
      }).catch((error) => {
        res.status(500).send(error);
      });
    }
  }
});

userRouter.delete('/users', (req, res) => {
  if (!req.query.username) {
    res.status(400).send({
      error: 'A username must be provided',
    });
  } else {
    User.findOne({username: req.query.username.toString()}).then((user) => {
      if (!user) {
        res.status(404).send();
      } else {
        // Delete all user notes before deleting the user
        return Note.deleteMany({owner: user._id}).then((result) => {
          if (!result.acknowledged) {
            res.status(500).send();
          } else {
            // Delete the user
            return User.findByIdAndDelete(user._id).then((user) => {
              res.send(user);
            });
          }
        });
      }
    }).catch((error) => {
      res.status(500).send(error);
    });
  }
});
