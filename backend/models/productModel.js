import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    images: [{ type: String, required: true }],
    description: { type: String, required: true },
    category: { type: String, required: true },
    features: [{ type: String }],
    price: { type: Number, required: true, default: 0 },
    originalPrice: { type: Number },
    sizes: [{ type: String }],
    colors: [{ name: String, value: String }],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    isNew: { type: Boolean, default: false },
    isSale: { type: Boolean, default: false },
    reviews: [reviewSchema],
    sizeGuide: {
      type: Map,
      of: { chest: String, waist: String, hips: String },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;

