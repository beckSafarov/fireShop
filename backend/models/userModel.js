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
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    cartItems: [
      {
        _id: String,
        name: String,
        image: String,
        price: String,
        countInStock: Number,
        qty: Number,
      },
    ],
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

userSchema.methods.addCartItem = function (item) {
  this.cartItems.push(item);
};

userSchema.methods.removeCartItem = function (passed) {
  this.cartItems = this.cartItems.filter((current) => current._id !== passed);
};

userSchema.methods.incrementCartItemQty = function (id, incValue) {
  this.cartItems.forEach((current) => {
    if (current._id === id) {
      current.qty += incValue;
    }
  });

  return this.cartItems;
};

userSchema.methods.updateCartItemQty = function (id, newQty) {
  this.cartItems.forEach((current) => {
    if (current._id === id) {
      current.qty = newQty;
    }
  });

  return this.cartItems;
};

const User = mongoose.model('User', userSchema);
export default User;
