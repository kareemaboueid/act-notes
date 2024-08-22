import mongoose from 'mongoose';
import logger from '../../logging/logger.js';

/**
 * ### Update Schema For One Document
 * @param {object} _schema - The schema to update
 * @param {string} _collection_name - The collection name
 * @param {string} _document_id - The document id
 * @param {object} _new_field.key - The new field key
 * @param {object} _new_field.value - The new field value
 * @returns {Promise<void>}
 */
const update_schema_one = async (
  _schema,
  _collection_name,
  _document_id,
  _new_field = {
    _key: undefined,
    _value: undefined,
  },
) => {
  try {
    // ------ START ------ //

    // destructure the new field key and value:
    const { key } = _new_field._key;
    const { value } = _new_field._value;

    // validate the schema, collection name, and new field:
    if (!_schema || !_collection_name || !key || !value) {
      throw new Error('Schema, collection name, and new field are required');
    }

    // step 1: set strict to false in the schema:
    _schema.set('strict', false);

    // log the schema strict mode:
    logger.is_schema_strict(
      _collection_name,
      `${_schema.options.strict} function: \`update_schema_one()\``,
    );

    // step 2: update the schema with the new field key and value:

    // update for one document:
    mongoose.connection.db
      .collection(String(_collection_name))
      .updateOne({ _id: _document_id }, { $set: { [key]: value } });

    // update for many documents:
    mongoose.connection.db
      .collection(String(_collection_name))
      .updateMany(
        { _id: { $ne: _document_id } },
        { $set: { [key]: null } },
        { multi: true },
      );

    // step 3: set strict back to true in the schema:
    _schema.set('strict', true);

    // log the schema strict mode:
    logger.is_schema_strict(
      _collection_name,
      `${_schema.options.strict} function: \`update_schema_one()\``,
    );

    // ------ HANDLE ERRORS ------ //
  } catch (error) {
    logger.error({ source: 'function: `update_schema_one()`' }, error);
  }

  // ------ END ------ //
};

export default update_schema_one;
