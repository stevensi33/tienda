// Array de productos
let productos = [];

// Obtener elementos del DOM
const contenedorProductos = document.getElementById("contenedorProductos");
const tipoProducto = document.getElementById("tipoProducto");
const listaCarrito = document.getElementById("listaCarrito");
const carritoTotal = document.getElementById("carritoTotal");
const formCompraFinal = document.getElementById("formCompraFinal");

let carrito = [];

// Cargar productos al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
  obtenerProductos(); // Obtener productos mediante Fetch
  
  // Verificar si hay productos en el carrito almacenados en el local storage
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});

// Función para obtener los productos mediante Fetch
async function obtenerProductos() {
  try {
      let respuesta = await fetch('/productos.json');
      if (respuesta.ok) {
          let data = await respuesta.json();
          productos = data;
          mostrarProductos(productos);
      } else {
          console.error('Error al obtener los productos:', respuesta.statusText);
      }
  } catch (error) {
      console.error('Hubo un error al obtener los productos:', error);
  }
}

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

    //notificación con Toastify
    Toastify({
      text: `El Producto ${productoSeleccionado.nombre} ha sido agregado al carrito`,
      duration: 3000,
      close: true,
      gravity: "top", 
      position: 'right', 
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
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

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Carrito vacío',
        text: 'Debes agregar al menos un producto al carrito antes de finalizar la compra.',
        confirmButtonText: 'OK'
      });
      return; 
    }

    // Notificación con SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Compra Finalizada',
      text: '¡Gracias por tu compra!',
      confirmButtonText: 'OK'
    });
    // Lógica para finalizar la compra...
    // Limpiar carrito y local storage
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
    formCompraFinal.reset();

    
  });
  
