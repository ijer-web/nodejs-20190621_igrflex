const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {

  try {
    const findResult = await Category.find({});
    const categories = findResult.map((_) => ({
      title: _.title,
      id: _._id,
      subcategories: _.subcategories.map((sub) => ({
        title: sub.title,
        id: sub._id,
      })),
    }));

    ctx.body = {categories: categories};
  } catch (err) {
    ctx.throw(500);
  }
};
