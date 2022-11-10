import mongoose from "mongoose";

const getPrice = (price) => {
  return (price / 100).toFixed(2);
};

const setPrice = (price) => {
  return price * 100;
};

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 100,
      required: true,
    },
    price: { type: Number, get: getPrice, set: setPrice, required: true },
    updateDate: { type: Date, required: false, default: null },
  },
  {
    toObject: { getters: true },
    toJSON: { getters: true },
    id: false,
  }
);

export default mongoose.model("Product", productSchema);
