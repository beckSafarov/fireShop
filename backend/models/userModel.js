import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
mongoose.set('useFindAndModify', false);
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timeStamps: true,
  }
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  }

  //encrypt password
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
