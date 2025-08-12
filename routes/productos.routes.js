const { Router } = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productos.controllers");
const router = Router();


//  GET
router.get("/", getProducts);

router.get("/:idProducto", getProductById);

// POST
router.post("/", createProduct);

// PUT

router.put("/:idProducto", updateProduct);

// DELETE

router.delete("/:idProducto", deleteProduct);

module.exports = router;
