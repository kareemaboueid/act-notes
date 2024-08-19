import mongoose from 'mongoose';
import * as EmailValidator from 'email-validator';

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
      minlength: [6, 'Password is too short, minimum 6 characters'],
      maxlength: [16, 'Password is too long, maximum 16 characters'],
      validate(_value) {
        if (_value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain the word "password"');
        }
        if (_value.includes(' ')) {
          throw new Error('Password cannot contain spaces');
        }
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
