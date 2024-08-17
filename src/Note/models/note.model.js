import mongoose from 'mongoose';
import note_schema from '../schemas/note.schema.js';
import note_db_naming from '../../../database/namings/note_naming.js';

/** ### Note Model */
const Note_model = mongoose.model(
  note_db_naming.M,
  note_schema,
  note_db_naming.C,
);

export default Note_model;
