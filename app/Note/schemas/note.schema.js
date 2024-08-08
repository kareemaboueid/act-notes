import mongoose from 'mongoose';
import { db_structure } from '../../../constants/db_structure.cnst.js';

/** ### Note Schema */
const note_schema = new mongoose.Schema(
  // ------ START ------ //

  {
    NOTE_TITLE: {
      type: String,
      Unique: true,
      index: true,
      trim: true,
      required: [true, 'Title is required'],
    },

    NOTE_CONTENT: {
      type: String,
      default: 'No content',
    },

    NOTE_STATUS: {
      type: String,
      default: 'todo',
    },

    NOTE_FOLDER: {
      type: String,
      default: 'home',
    },

    NOTE_IMPORTANCE: {
      type: String,
      default: 'normal',
    },

    FLAG_FREEZE: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: db_structure.user.model,
    },
  },

  {
    timestamps: true,
    collection: db_structure.note.coll,
    versionKey: false,
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },

  // ------ END ------ //
);

export default note_schema;
