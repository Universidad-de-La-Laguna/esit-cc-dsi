import express from 'express';
import { Note } from '../models/note.js';
import { User } from '../models/user.js';

export const noteRouter = express.Router();

noteRouter.post('/notes/:username', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username
    });

    if (!user) {
      return res.status(404).send({
        error: "User not found"
      });
    }
    
    const note = new Note({
      ...req.body,
      owner: user._id
    });

    await note.save();
    await note.populate({
      path: 'owner',
      select: ['username']
    });
    return res.status(201).send(note);
  } catch (error) {
    return res.status(500).send(error);
  }
});

noteRouter.get('/notes/:username', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username
    });

    if (!user) {
      return res.status(404).send({
        error: "User not found"
      });
    }

    const notes = await Note.find({
      owner: user._id
    }).populate({
      path: 'owner',
      select: ['username']
    });

    if (notes.length !== 0) {
      return res.send(notes);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

noteRouter.get('/notes/:username/:id', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username
    });

    if (!user) {
      return res.status(404).send({
        error: "User not found"
      });
    }

    const note = await Note.findOne({
      owner: user._id,
      _id: req.params.id
    }).populate({
      path: 'owner',
      select: ['username']
    });

    if (note) {
      return res.send(note);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

noteRouter.patch('/notes/:username/:id', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username
    });

    if (!user) {
      return res.status(404).send({
        error: "User not found"
      });
    }

    const allowedUpdates = ['title', 'body', 'color'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({
        error: 'Update is not permitted',
      });
    }

    const note = await Note.findOneAndUpdate({
      owner: user._id,
      _id: req.params.id
    },
    req.body,
    {
      new: true,
      runValidators: true
    }).populate({
      path: 'owner',
      select: ['username']
    });

    if (note) {
      return res.send(note);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});

noteRouter.delete('/notes/:username/:id', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username
    });

    if (!user) {
      return res.status(404).send({
        error: "User not found"
      });
    }

    const note = await Note.findOneAndDelete({
      owner: user._id,
      _id: req.params.id
    }).populate({
      path: 'owner',
      select: ['username']
    });

    if (note) {
      return res.send(note);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});
