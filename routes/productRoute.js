const router = require("express").Router();
const {
  createProduct,
  getProducts,
  getProduct,
} = require("../controller/productController");

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);

module.exports = router;
