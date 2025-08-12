class ProductosService {
  constructor() {
    this.productos = [
      {
        id: 1,
        nombre: "Producto 1",
        precio: 100,
        categoria: "Electrónicos",
        stock: 50,
        fechaCreacion: new Date()
      },
      {
        id: 2,
        nombre: "Producto 2",
        precio: 200,
        categoria: "Ropa",
        stock: 30,
        fechaCreacion: new Date()
      },
      {
        id: 3,
        nombre: "Producto 3",
        precio: 300,
        categoria: "Hogar",
        stock: 25,
        fechaCreacion: new Date()
      },
    ];
  }

  // Obtener todos los productos con filtros opcionales
  getAllProducts(filters = {}) {
    let productosFiltrados = [...this.productos];

    // Filtro por categoría
    if (filters.categoria) {
      productosFiltrados = productosFiltrados.filter(
        producto => producto.categoria.toLowerCase() === filters.categoria.toLowerCase()
      );
    }

    // Filtro por rango de precio
    if (filters.precioMin || filters.precioMax) {
      productosFiltrados = productosFiltrados.filter(producto => {
        if (filters.precioMin && producto.precio < filters.precioMin) return false;
        if (filters.precioMax && producto.precio > filters.precioMax) return false;
        return true;
      });
    }

    // Filtro por stock
    if (filters.stockMin) {
      productosFiltrados = productosFiltrados.filter(
        producto => producto.stock >= filters.stockMin
      );
    }

    // Ordenamiento
    if (filters.ordenarPor) {
      const { campo, direccion = 'asc' } = filters.ordenarPor;
      productosFiltrados.sort((a, b) => {
        if (direccion === 'asc') {
          return a[campo] > b[campo] ? 1 : -1;
        } else {
          return a[campo] < b[campo] ? 1 : -1;
        }
      });
    }

    return productosFiltrados;
  }

  // Obtener producto por ID
  getProductById(id) {
    const producto = this.productos.find(p => p.id === parseInt(id));
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    return producto;
  }

  // Crear nuevo producto con validaciones
  createProduct(productoData) {
    // Validaciones
    this.validateProductData(productoData);

    // Verificar si ya existe un producto con el mismo nombre
    const productoExistente = this.productos.find(
      p => p.nombre.toLowerCase() === productoData.nombre.toLowerCase()
    );
    
    if (productoExistente) {
      throw new Error('Ya existe un producto con ese nombre');
    }

    // Generar nuevo ID
    const nuevoId = this.productos.length > 0 
      ? Math.max(...this.productos.map(p => p.id)) + 1 
      : 1;

    // Crear producto con datos adicionales
    const nuevoProducto = {
      id: nuevoId,
      nombre: productoData.nombre,
      precio: productoData.precio,
      categoria: productoData.categoria || 'Sin categoría',
      stock: productoData.stock || 0,
      descripcion: productoData.descripcion || '',
      fechaCreacion: new Date(),
      activo: true
    };

    this.productos.push(nuevoProducto);
    return nuevoProducto;
  }

  // Actualizar producto
  updateProduct(id, productoData) {
    const producto = this.getProductById(id);
    
    // Validaciones
    if (productoData.nombre) {
      this.validateProductData({ nombre: productoData.nombre, precio: productoData.precio || producto.precio });
    }

    // Verificar nombre único (excluyendo el producto actual)
    if (productoData.nombre && productoData.nombre !== producto.nombre) {
      const productoExistente = this.productos.find(
        p => p.id !== parseInt(id) && p.nombre.toLowerCase() === productoData.nombre.toLowerCase()
      );
      
      if (productoExistente) {
        throw new Error('Ya existe otro producto con ese nombre');
      }
    }

    // Actualizar campos
    Object.keys(productoData).forEach(key => {
      if (key !== 'id' && key !== 'fechaCreacion') {
        producto[key] = productoData[key];
      }
    });

    producto.fechaModificacion = new Date();
    return producto;
  }

  // Eliminar producto (soft delete)
  deleteProduct(id) {
    const producto = this.getProductById(id);
    
    // Soft delete - marcar como inactivo en lugar de eliminar
    producto.activo = false;
    producto.fechaEliminacion = new Date();
    
    return { message: 'Producto eliminado correctamente', producto };
  }

  // Restaurar producto eliminado
  restoreProduct(id) {
    const producto = this.productos.find(p => p.id === parseInt(id));
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    
    if (producto.activo) {
      throw new Error('El producto ya está activo');
    }
    
    producto.activo = true;
    delete producto.fechaEliminacion;
    
    return { message: 'Producto restaurado correctamente', producto };
  }

  // Obtener estadísticas de productos
  getProductStats() {
    const productosActivos = this.productos.filter(p => p.activo !== false);
    
    return {
      totalProductos: productosActivos.length,
      totalStock: productosActivos.reduce((sum, p) => sum + p.stock, 0),
      valorTotal: productosActivos.reduce((sum, p) => sum + (p.precio * p.stock), 0),
      categorias: [...new Set(productosActivos.map(p => p.categoria))],
      precioPromedio: productosActivos.length > 0 
        ? productosActivos.reduce((sum, p) => sum + p.precio, 0) / productosActivos.length 
        : 0
    };
  }

  // Validaciones
  validateProductData(data) {
    if (!data.nombre || data.nombre.trim().length < 2) {
      throw new Error('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!data.precio || data.precio <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    
    if (data.stock !== undefined && data.stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }
    
    if (data.categoria && data.categoria.trim().length < 2) {
      throw new Error('La categoría debe tener al menos 2 caracteres');
    }
  }

  // Buscar productos por texto
  searchProducts(query) {
    if (!query || query.trim().length < 2) {
      throw new Error('La búsqueda debe tener al menos 2 caracteres');
    }
    
    const searchTerm = query.toLowerCase();
    return this.productos.filter(producto => 
      producto.activo !== false && (
        producto.nombre.toLowerCase().includes(searchTerm) ||
        producto.categoria.toLowerCase().includes(searchTerm) ||
        (producto.descripcion && producto.descripcion.toLowerCase().includes(searchTerm))
      )
    );
  }
}

module.exports = ProductosService; 