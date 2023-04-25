import express from 'express';
import { Note } from '../models/note.js';

export const noteRouter = express.Router();

noteRouter.post('/notes', (req, res) => {
  const note = new Note(req.body);

  note.save().then((note) => {
    res.status(201).send(note);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

noteRouter.get('/notes', (req, res) => {
  const filter = req.query.title?{title: req.query.title.toString()}:{};

  Note.find(filter).then((notes) => {
    if (notes.length !== 0) {
      res.send(notes);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});

noteRouter.get('/notes/:id', (req, res) => {
  Note.findById(req.params.id).then((note) => {
    if (!note) {
      res.status(404).send();
    } else {
      res.send(note);
    }
  }).catch(() => {
    res.status(500).send();
  });
});

noteRouter.patch('/notes', (req, res) => {
  if (!req.query.title) {
    res.status(400).send({
      error: 'A title must be provided',
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
      Note.findOneAndUpdate({title: req.query.title.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((note) => {
        if (!note) {
          res.status(404).send();
        } else {
          res.send(note);
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
    }
  }
});

noteRouter.patch('/notes/:id', (req, res) => {
  const allowedUpdates = ['title', 'body', 'color'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({
      error: 'Update is not permitted',
    });
  } else {
    Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).then((note) => {
      if (!note) {
        res.status(404).send();
      } else {
        res.send(note);
      }
    }).catch((error) => {
      res.status(400).send(error);
    });
  }
});

noteRouter.delete('/notes', (req, res) => {
  if (!req.query.title) {
    res.status(400).send({
      error: 'A title must be provided',
    });
  } else {
    Note.findOneAndDelete({title: req.query.title.toString()}).then((note) => {
      if (!note) {
        res.status(404).send();
      } else {
        res.send(note);
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});

noteRouter.delete('/notes/:id', (req, res) => {
  Note.findByIdAndDelete(req.params.id).then((note) => {
    if (!note) {
      res.status(404).send();
    } else {
      res.send(note);
    }
  }).catch(() => {
    res.status(400).send();
  });
});
