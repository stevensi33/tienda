// Clase Producto
class Producto {
    constructor(id, nombre, precio, tipo) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.tipo = tipo;
    }
  }
  
  // Array de productos
  const productos = [
    new Producto(1, "Tenis Fresh Free Edition", 100, "Tenis"),
    new Producto(2, "Tenis Terrex Free Edition", 30, "Tenis"),
    new Producto(3, "Tenis Free Tex Running", 20, "Tenis"),
    new Producto(4, "Tenis London Free Edition", 120, "Tenis"),
    new Producto(5, "Camiseta Nature Edition", 25, "Camiseta"),
    new Producto(6, "Camiseta Athletics Edition", 15, "Camiseta"),
    new Producto(7, "Camiseta Athletics Edition", 550, "Camiseta"), 
    new Producto(8, "Camiseta Nature Edition", 600, "Camiseta"),
    new Producto(9, "Short State Edition", 300, "Short"), 
    new Producto(10, "Short Athletics", 250, "Short"), 
    new Producto(11, "Short Athletics", 280, "Short"), 
    new Producto(12, "Short Nature Edition", 320, "Short"), 
    new Producto(13, "Tenis Running Edition", 2100, "Tenis"), 
    new Producto(14, "Tenis Sport Tex Edition", 1900, "Tenis"), 
    new Producto(15, "Tenis LifeStyle Edition", 2300, "Tenis"), 
    new Producto(16, "Tenis LifeStye Edition", 2500, "Tenis")
  ];
  
  // Obtener elementos del DOM
  const contenedorProductos = document.getElementById("contenedorProductos");
  const tipoProducto = document.getElementById("tipoProducto");
  const listaCarrito = document.getElementById("listaCarrito");
  const carritoTotal = document.getElementById("carritoTotal");
  const formCompraFinal = document.getElementById("formCompraFinal");
  
  let carrito = [];
  
  // Cargar productos al iniciar la página
  document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(productos);
  
    // Verificar si hay productos en el carrito almacenados en el local storage
    if (localStorage.getItem("carrito")) {
      carrito = JSON.parse(localStorage.getItem("carrito"));
      actualizarCarrito();
    }
  });
  
  // Mostrar productos según el tipo seleccionado
  tipoProducto.addEventListener("change", () => {
    const tipoSeleccionado = tipoProducto.value;
    if (tipoSeleccionado === "0") {
      mostrarProductos(productos);
    } else {
      const productosFiltrados = productos.filter(
        (producto) => producto.tipo === tipoSeleccionado
      );
      mostrarProductos(productosFiltrados);
    }
  });
  
  // Mostrar los productos en el contenedor
  function mostrarProductos(productos) {
    contenedorProductos.innerHTML = "";
    productos.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("col-md-3");
  
      const card = document.createElement("div");
      card.classList.add("product-card");
  
      const img = document.createElement("img");
      img.src = `img/producto${producto.id}.jpg`;
      img.alt = producto.nombre;
  
      const titulo = document.createElement("h3");
      titulo.textContent = producto.nombre;
  
      const precio = document.createElement("p");
      precio.textContent = `$${producto.precio}`;
  
      const boton = document.createElement("button");
      boton.textContent = "Agregar al Carrito";
      boton.classList.add("btn", "btn-warning");
      boton.dataset.id = producto.id;
      boton.addEventListener("click", agregarAlCarrito);
  
      card.appendChild(img);
      card.appendChild(titulo);
      card.appendChild(precio);
      card.appendChild(boton);
      div.appendChild(card);
  
      contenedorProductos.appendChild(div);
    });
  }
  
  // Agregar producto al carrito
  function agregarAlCarrito(evento) {
    const idProducto = evento.target.dataset.id;
    const productoSeleccionado = productos.find(
      (producto) => producto.id === parseInt(idProducto)
    );
  
    carrito.push(productoSeleccionado);
  
    // Actualizar carrito en el local storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
  
    actualizarCarrito();
  }
  
 
  // Función para generar los elementos de la lista del carrito
function generarListaCarrito() {
    listaCarrito.innerHTML = ""; // Limpia la lista del carrito antes de generar los elementos
  
    carrito.forEach((producto) => {
      const li = document.createElement("li");
      li.classList.add("li-productos");
      li.textContent = producto.nombre + " - $" + producto.precio;
    
      
  
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.classList.add("btn", "btn-danger", "btn-eliminar");
      botonEliminar.addEventListener("click", () => eliminarDelCarrito(producto.id));
  
      li.appendChild(botonEliminar);
      listaCarrito.appendChild(li);
    });
  }
  
  // Función para eliminar un producto del carrito
  function eliminarDelCarrito(idProducto) {
    const indiceProducto = carrito.findIndex((producto) => producto.id === idProducto);
  
    if (indiceProducto !== -1) {
      carrito.splice(indiceProducto, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      generarListaCarrito();
      calcularTotal();
    }
  }
  
  // Llama a la función generarListaCarrito después de actualizar el carrito
  function actualizarCarrito() {
    // ...
    generarListaCarrito();
    calcularTotal();
  }
  

  
  // Calcular el total del carrito
  function calcularTotal() {
    let total = 0;
    carrito.forEach((producto) => {
      total += producto.precio;
    });
    carritoTotal.textContent = `Total: $${total}`;
  }
  
  // Finalizar compra
  formCompraFinal.addEventListener("submit", (evento) => {
    evento.preventDefault();
    // Lógica para finalizar la compra...
    // Limpiar carrito y local storage
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
    formCompraFinal.reset();
  });
  
