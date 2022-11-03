const CategoriesController = require('../../db/controllers/categories-controller');

const checkValueTitle = (title) => title === '';
const checkValueAuthor = (author) => author === '';

const clearHtmlTags = (str) => {
  if (!str) return str;
  return str.replace(/(<([^>]+)>)/ig, '');
};

const createOverviewBook = (body) => {
  const MIN = 0;
  const MAX = 148;
  const clearBody = clearHtmlTags(body);
  const subsChar = clearBody.substr(MIN, MAX);
  const sliceLastThreeChars = `${subsChar.slice(0, -1)}...`;
  return sliceLastThreeChars;
};

const checkValueIsEmptyOrNot = (payload) => {
  const { title, author } = payload;
  const statusValue = checkValueTitle(title) || checkValueAuthor(author);
  return statusValue;
};

const getCategoryById = async (request) => {
  const { categoryId: id } = request.payload;
  const categoriesController = new CategoriesController(request);
  const response = await categoriesController.getOneCategory({ id });
  return response;
};

const checkIdLength = (id) => {
  const MIN = 24;
  if (id.length < MIN) return false;
  return true;
};

const clearPlusCharacterFromName = (name) => {
  return name.toLowerCase().replace(/[+]/g, ' ');
};

const getCategoryByName = async (request) => {
  const { categoryName } = request.params;
  const name = clearPlusCharacterFromName(categoryName);
  const categoriesController = new CategoriesController(request);
  const categories = await categoriesController.getAllCategories();
  const getCategory = categories.filter((category) => {
    return category.name.toLowerCase() === name;
  })[0];

  return getCategory;
};

module.exports = {
  createOverviewBook,
  checkValueIsEmptyOrNot,
  getCategoryById,
  checkIdLength,
  clearPlusCharacterFromName,
  getCategoryByName,
};