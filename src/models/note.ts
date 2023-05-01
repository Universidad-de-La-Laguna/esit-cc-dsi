import { Document, Schema, model } from 'mongoose';
import { UserDocumentInterface } from './user.js';

interface NoteDocumentInterface extends Document {
  title: string,
  body: string,
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'magenta',
  owner: UserDocumentInterface,
}

const NoteSchema = new Schema<NoteDocumentInterface>({
  title: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Note title must start with a capital letter');
      }
    },
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
    default: 'yellow',
    enum: ['blue', 'green', 'red', 'yellow', 'magenta'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

export const Note = model<NoteDocumentInterface>('Note', NoteSchema);
