import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import user_schema from '../schemas/user.schema.js';
import { SALT_ROUNDS } from '../../../configs/env.cnfg.js';
import user_db_naming from '../../../database/namings/user_naming.js';

// bcrypt password before saving:
user_schema.pre('save', async function (next) {
  try {
    if (!this.isModified('USER_PASSWORD')) next();

    this.USER_PASSWORD = await bcrypt.hash(
      this.USER_PASSWORD,
      Number(SALT_ROUNDS),
    );
  } catch (error) {
    next(error);
  }
});

// validate password:
user_schema.methods.validate_password = async function (_entered_password) {
  return await bcrypt.compare(String(_entered_password), this.USER_PASSWORD);
};

// get user exluding a peice of data:
user_schema.methods.exclude = async function (_exluded_data) {
  const user = this.toObject();
  delete user[_exluded_data];
  return await user;
};

/** ### User Model */
const User_model = mongoose.model(
  user_db_naming.M,
  user_schema,
  user_db_naming.C,
);

export default User_model;
