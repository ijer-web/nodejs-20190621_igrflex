const Category = require('../models/Category');
const Product = require('../models/Product');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const SubCategoryRest = await SubCategory.find();
  console.log('SubCategoryRest', SubCategoryRest.length);
  // const CategoryRest = await Category.find();
  // console.log'CategoryRest', CategoryRest.length);
  try {
    await SubCategory.find({_id: ctx.query.subcategory})
        .then((resolve) => {
          // console.log' ctx.query.subcategory', ctx.query.subcategory);
          // console.log'resolve', resolve);
          if (resolve.length === 0) ctx.throw(404);
          return true;
        }, (reject) => {
          // console.log'reject 1', reject);
          ctx.body = {products: []};
          ctx.throw(404);
        })
        .then((resolve) => {
          return Product.find({subcategory: ctx.query.subcategory});
        }, (reject) => {
          // console.log'reject 2', reject);
          ctx.body = {products: []};
          ctx.throw(404);
        })
        .then((resolve) => {
          console.log('2 - resolve', resolve);
          const products = resolve.map((_) => ({
            id: _._id,
            title: _.title,
            images: _.images,
            category: _.category,
            subcategory: _.subcategory,
            price: _.price,
            description: _.description,
          }));
          console.log('3 - products', products);

          ctx.body = {products: products};
          // console.log'4 - ctx.body', ctx.body);
        });
    // .catch((err) => {
    //    // console.log'5 и тут поймали', err);
    //     ctx.throw(500);
    // });
  } catch (e) {
    // console.log'5 и тут поймали', e);

    // ctx.throw(500);
  }
};

module.exports.productList = async function productList(ctx, next) {
  // // console.log'2 ctx.body', ctx.body);
  // ctx.body = {products: []};
};

module.exports.productById = async function productById(ctx, next) {
  // try {
  //   const findResult = await Product.find({subcategory: ctx.query.subcategory});
  //   //// console.log'findResult', findResult);
  //   //// console.log'ctx.query.subcategory', ctx.query.subcategory);
  //   const products = findResult.map((_) => ({
  //     id: _._id,
  //     title: _.title,
  //     images: _.images,
  //     category: _.category,
  //     subcategory: _.subcategory,
  //     price: _.price,
  //     description: _.description,
  //   }));
  //
  //   ctx.body = {products};
  // } catch (err) {
  //   ctx.throw(500);
  // }
};

