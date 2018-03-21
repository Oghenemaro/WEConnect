import db from '../models/index';

const dbCategory = db.categories;

class Category {
  static addNewCategory(req, res) {
    const { category } = req.body;
    if (!category) {
      return res.status(400).send({ Status: 'Failed', Message: 'No category entered, enter a category' });
    }
    return dbCategory
      .create({
        category
      })
      .then(() => res.status(200).send({ Status: 'Successful', Message: 'Neww category added' }))
      .catch(() => res.status(400).send({ Status: 'Failed', Message: 'Category could not be added' }));
  }
  static getCategories(req, res) {
    dbCategory.findAll()
      .then(categories => res.status(200).send({ Status: 'Successful', Message: categories }))
      .catch(() => res.status(400).send({ Status: 'Failed', Message: 'Failed to load categories' }));
  }
}

export default Category;
