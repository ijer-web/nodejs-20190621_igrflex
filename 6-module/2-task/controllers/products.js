const Category = require('../models/Category');
const Product = require('../models/Product');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  try {
    await Product.find({subcategory: ctx.query.subcategory})
        .then((resolve) => {
          const products = resolve.map((_) => ({
            id: _._id,
            title: _.title,
            images: _.images,
            category: _.category,
            subcategory: _.subcategory,
            price: _.price,
            description: _.description,
          }));

          ctx.body = {products: products};
        }, (resolve) =>{
          // ctx.throw(404);
          ctx.body = {products: []};
        })
        .catch((err) => {
          ctx.throw(500);
        });
  } catch (e) {
    ctx.throw(500);
  }
};

module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find();

  ctx.body = {products};
  next();
};

module.exports.productById = async function productById(ctx, next) {
  await Product.findById(ctx.params.id).then((item) => {
    if (item) {
      const product = [item].map((_) => ({

        id: _._id,
        title: _.title,
        images: _.images,
        category: _.category,
        subcategory: _.subcategory,
        price: _.price,
        description: _.description,
      }))[0];

      ctx.body = {product};
    } else {
      ctx.status = 404;
    }
  }).catch((err) => {
    ctx.status = 400;
  });

  next();
};

