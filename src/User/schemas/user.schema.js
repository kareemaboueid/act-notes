import mongoose from 'mongoose';
import * as EmailValidator from 'email-validator';
import vld_validate_password from '../../../validations/validate_password.vld.js';

/** ### User Schema */
const user_schema = new mongoose.Schema(
  // ------ START ------ //

  {
    USER_IMAGE: {
      type: String,
    },

    USER_FULLNAME: {
      type: String,
      trim: true,
      required: [true, 'Full name is required'],
      maxlength: [255, 'Full name is too long, maximum 255 characters'],
    },

    USER_EMAIL: {
      type: String,
      trim: true,
      unique: true,
      syncIndexes: true,
      required: [true, 'Email address is required'],
      maxlength: [255, 'Full name is too long, maximum 255 characters'],
      validate(_value) {
        if (!EmailValidator.validate(_value)) {
          throw new Error(`${_value} is not a valid email address`);
        }
      },
    },

    USER_USERNAME: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      syncIndexes: true,
      required: [true, 'Username is required'],
      maxlength: [255, 'Full name is too long, maximum 255 characters'],
    },

    USER_PASSWORD: {
      type: String,
      trim: true,
      required: [true, 'Password is required'],
      validate(_value) {
        vld_validate_password(_value);
      },
    },

    FLAG_FREEZE: {
      type: Boolean,
      default: false,
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

export default user_schema;
