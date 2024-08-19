import mongoose from 'mongoose';
import note_schema from '../schemas/note.schema.js';

/** ### Note Model */
const Note_model = mongoose.model('Note', note_schema, 'notes');

export default Note_model;
