const Product = require('../models/Product');

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  try {
    const query = ctx.query.query || '';

    const products = await Product
        .find(
            {$text: {$search: query}},
            {score: {$meta: 'textScore'}})
        .sort(
            {score: {$meta: 'textScore'}});

    if (!products) return next();

    ctx.body = {
      products: products.map((item) => ({
        id: item._id,
        title: item.title,
        images: item.images,
        category: item.category,
        subcategory: item.subcategory,
        price: item.price,
        description: item.description,
      })),
    };
  } catch (e) {
    ctx.body = {products: []};
  }
};
