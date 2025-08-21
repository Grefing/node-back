const { Router } = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productos.controllers");
const {
  createProductValidation,
  updateProductValidation,
} = require("../validations/productos.validations");
const authenticateToken = require("../middleware/auth");
const router = Router();

//  GET
router.get("/", getProducts);

router.get("/:idProducto", getProductById);

// POST
router.post(
  "/",
  createProductValidation,
  authenticateToken("admin"),
  createProduct
);

// PUT

router.put(
  "/:idProducto",
  updateProductValidation,
  authenticateToken("admin"),
  updateProduct
);

// DELETE

router.delete("/:idProducto", authenticateToken("admin"), deleteProduct);

module.exports = router;
