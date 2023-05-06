const Product = require("../model/Product");

// @desc create new product
// @route POST /products
const createProduct = async (req, res) => {
  try {
    const { name, price, images, inStock, description } = req.body;
    const job = await Product.create({
      name,
      price,
      images,
      inStock,
      description,
    });
    res.status(200).send(job);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// @desc get all products
// @route GET /products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// @desc get a product
// @route GET /products/:id
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
};
