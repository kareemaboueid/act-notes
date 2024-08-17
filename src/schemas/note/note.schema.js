import mongoose from 'mongoose';
import user_db_naming from '../../../database/namings/user_naming.js';

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

    CREATED_BY: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user_db_naming.M,
    },
  },

  {
    timestamps: { createdAt: 'CREATED_AT', updatedAt: 'UPDATED_AT' },
    versionKey: false,
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },

  // ------ END ------ //
);

export default note_schema;
