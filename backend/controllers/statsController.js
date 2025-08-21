import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

// @desc    Get application statistics
// @route   GET /api/stats
// @access  Private/Admin
const getAppStats = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments({});
  const productCount = await Product.countDocuments({});
  const orderCount = await Order.countDocuments({});

  const totalSalesResult = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$totalPrice' },
      },
    },
  ]);

  const totalSales = totalSalesResult.length > 0 ? totalSalesResult[0].totalSales : 0;

  res.json({
    userCount,
    productCount,
    orderCount,
    totalSales,
  });
});

export { getAppStats };