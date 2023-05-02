import express from 'express';
import { Note } from '../models/note.js';
import { User } from '../models/user.js';

export const noteRouter = express.Router();

noteRouter.post('/notes/:username', (req, res) => {
  // Find the user by their username
  User.findOne({username: req.params.username}).then((user) => {
    if (!user) {
      res.status(404).send({
        error: "User not found"
      });
    } else {
      // Instance of the new note that consists of the body
      // provided in the request and the _id of the owner
      const note = new Note({
        ...req.body,
        owner: user._id
      });

      // Save the note
      return note.save().then((note) => {
        return note.populate({
          path: 'owner',
          select: ['username']
        }).then(() => {
          res.status(201).send(note);
        });
      });
    }
  }).catch((error) => {
    res.status(500).send(error);
  });
});

noteRouter.get('/notes/:username', (req, res) => {
  // Find the user by their username
  User.findOne({username: req.params.username}).then((user) => {
    if (!user) {
      res.status(404).send({
        error: "User not found"
      });
    } else {
      return Note.find({owner: user._id}).populate({
        path: 'owner',
        select: ['username']
      }).then((notes) => {
        if (notes.length !== 0) {
          res.send(notes);
        } else {
          res.status(404).send();
        }
      });
    }
  }).catch((error) => {
    res.status(500).send(error);
  });
});

noteRouter.get('/notes/:username/:id', (req, res) => {
  // Find the user by their username
  User.findOne({username: req.params.username}).then((user) => {
    if (!user) {
      res.status(404).send({
        error: "User not found"
      });
    } else {
      return Note.findOne({
        owner: user._id,
        _id: req.params.id
      }).populate({
        path: 'owner',
        select: ['username']
      }).then((note) => {
        if (note) {
          res.send(note);
        } else {
          res.status(404).send();
        }
      });
    }
  }).catch((error) => {
    res.status(500).send(error);
  });
});

noteRouter.patch('/notes/:username/:id', (req, res) => {
  // Find the user by their username
  User.findOne({username: req.params.username}).then((user) => {
    if (!user) {
      res.status(404).send({
        error: "User not found"
      });
    } else {
      const allowedUpdates = ['title', 'body', 'color'];
      const actualUpdates = Object.keys(req.body);
      const isValidUpdate =
        actualUpdates.every((update) => allowedUpdates.includes(update));

      if (!isValidUpdate) {
        res.status(400).send({
          error: 'Update is not permitted',
        });
      } else {
        return Note.findOneAndUpdate({
          owner: user._id,
          _id: req.params.id
        },
        req.body,
        {
          new: true,
          runValidators: true,
        }).populate({
          path: 'owner',
          select: ['username']
        }).then((note) => {
          if (!note) {
            res.status(404).send();
          } else {
            res.send(note);
          }
        });
      }
    }
  }).catch((error) => {
    res.status(400).send(error);
  });
});

noteRouter.delete('/notes/:username/:id', (req, res) => {
  // Find the user by their username
  User.findOne({username: req.params.username}).then((user) => {
    if (!user) {
      res.status(404).send({
        error: "User not found"
      });
    } else {
      return Note.findOneAndDelete({
        owner: user._id,
        _id: req.params.id
      }).populate({
        path: 'owner',
        select: ['username']
      }).then((note) => {
        if (note) {
          res.send(note);
        } else {
          res.status(404).send();
        }
      });
    }
  }).catch((error) => {
    res.status(500).send(error);
  });
});
