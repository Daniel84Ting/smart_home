const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/// setup smart home schema ///
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    img: String,
    price: { type: Number, min: [0] },
    qty: {
      type: Number,
      min: [0],
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
    comments: [
      {
        type: new mongoose.Schema({
          comment: { type: String },
          enteredBy: { type: Schema.Types.ObjectId, ref: 'users' },
        }),
      },
      { timestamps: true },
    ],
  },
  { timestamps: true },
);

const Product = mongoose.model('home', productSchema);

module.exports = Product;
