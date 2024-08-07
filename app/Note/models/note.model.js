import mongoose from 'mongoose';
import note_schema from '../schemas/note.schema.js';
import { db_structure } from '../../../constants/db_structure.cnst.js';

/** ### Note Model */
const Note_model = mongoose.model(db_structure.note.model, note_schema);

export default Note_model;
