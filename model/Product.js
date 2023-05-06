const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    images: [String],
    inStock: {
      XS: { type: Number, default: 0 },
      S: { type: Number, default: 0 },
      M: { type: Number, default: 0 },
      L: { type: Number, default: 0 },
      XL: { type: Number, default: 0 },
      "1X": { type: Number, default: 0 },
      "2X": { type: Number, default: 0 },
      "3X": { type: Number, default: 0 },
    },
    description: {
      details: String,
      model: String,
      material: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
