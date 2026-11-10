/*
 * Módulo de Producto y Personalización
 * Responsable: Mariano Rasgido
 * Lee el ID desde la URL, muestra el producto, permite seleccionar tamaño,
 * visualizar su galería y personalizarlo con el nombre de la mascota.
 */
(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const money = (value) => new Intl.NumberFormat("es-AR", {
    style: "currency", currency: "ARS", maximumFractionDigits: 0
  }).format(value);
  const escapar = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  const parametros = new URLSearchParams(window.location.search);
  const idProducto = Number(parametros.get("id"));
  const producto = Array.isArray(PRODUCTOS)
    ? PRODUCTOS.find((item) => item.id === idProducto)
    : null;

  const estado = $("#estadoProducto");
  const detalle = $("#detalleProducto");
  const toast = $("#toast");

  function mostrarAviso(mensaje) {
    toast.textContent = mensaje;
    toast.classList.add("show");
    window.clearTimeout(mostrarAviso.temporizador);
    mostrarAviso.temporizador = window.setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function mostrarError(mensaje) {
    const error = $("#errorProducto");
    error.textContent = mensaje;
    error.hidden = false;
  }

  function limpiarError() {
    const error = $("#errorProducto");
    error.textContent = "";
    error.hidden = true;
  }

  // Permite usar una o varias imágenes sin obligar a modificar el catálogo actual.
  function obtenerImagenes(item) {
    const lista = Array.isArray(item.imagenes) && item.imagenes.length
      ? item.imagenes
      : [item.imagen];
    return lista.filter(Boolean);
  }

  function seleccionarImagen(ruta, indice) {
    const imagen = $("#imagenPrincipal");
    imagen.src = ruta;
    imagen.alt = producto.nombre;
    document.querySelectorAll(".miniatura").forEach((boton, posicion) => {
      boton.setAttribute("aria-pressed", String(posicion === indice));
    });
  }

  function renderizarGaleria() {
    const imagenes = obtenerImagenes(producto);
    const miniaturas = $("#miniaturas");

    if (!imagenes.length) {
      $("#imagenPrincipal").alt = "Imagen no disponible";
      miniaturas.innerHTML = "";
      return;
    }

    seleccionarImagen(imagenes[0], 0);
    miniaturas.innerHTML = imagenes.map((ruta, indice) => `
      <button class="miniatura" type="button" data-imagen="${indice}"
        aria-label="Ver imagen ${indice + 1}" aria-pressed="${indice === 0}">
        <img src="${escapar(ruta)}" alt="Vista ${indice + 1} de ${escapar(producto.nombre)}">
      </button>
    `).join("");

    miniaturas.addEventListener("click", (evento) => {
      const boton = evento.target.closest("[data-imagen]");
      if (!boton) return;
      const indice = Number(boton.dataset.imagen);
      seleccionarImagen(imagenes[indice], indice);
    });
  }

  function renderizarProducto() {
    if (!producto) {
      estado.textContent = "No encontramos ese producto. Revisá el enlace o volvé al catálogo.";
      const volver = document.createElement("a");
      volver.href = "catalogo.html";
      volver.className = "btn btn-pri";
      volver.textContent = "Ir al catálogo";
      estado.appendChild(volver);
      document.title = "Producto no encontrado | Huellas & Estilo";
      return;
    }

    estado.hidden = true;
    detalle.hidden = false;
    document.title = `${producto.nombre} | Huellas & Estilo`;
    $("#migaActual").textContent = producto.nombre;
    $("#nombreProducto").textContent = producto.nombre;
    $("#precioProducto").textContent = money(producto.precio);
    $("#descripcionProducto").textContent = producto.descripcion;
    $("#categoriaProducto").textContent = `Categoría: ${String(producto.categoria).replace(/-/g, " ")}`;
    $("#etiquetasProducto").innerHTML = `
      ${producto.personalizable ? '<span class="tag">Personalizable</span>' : ""}
      <span class="tag tag-s">${escapar(producto.categoria)}</span>
    `;

    const selectorTamano = $("#tamanoProducto");
    selectorTamano.insertAdjacentHTML("beforeend", producto.tamanos.map((tamano) =>
      `<option value="${escapar(tamano)}">${escapar(tamano.charAt(0).toUpperCase() + tamano.slice(1))}</option>`
    ).join(""));

    $("#bloquePersonalizacion").hidden = !producto.personalizable;
    $("#nombreMascota").required = Boolean(producto.personalizable);
    renderizarGaleria();
  }

  function agregarAlCarrito(evento) {
    evento.preventDefault();
    limpiarError();

    const tamano = $("#tamanoProducto").value;
    const cantidad = Number($("#cantidadProducto").value);
    const nombreMascota = $("#nombreMascota").value.trim();

    if (!tamano) {
      mostrarError("Seleccioná un tamaño antes de continuar.");
      $("#tamanoProducto").focus();
      return;
    }
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 20) {
      mostrarError("La cantidad debe ser un número entero entre 1 y 20.");
      $("#cantidadProducto").focus();
      return;
    }
    if (producto.personalizable && !nombreMascota) {
      mostrarError("Ingresá el nombre de tu mascota para personalizar el producto.");
      $("#nombreMascota").focus();
      return;
    }
    if (nombreMascota.length > 20) {
      mostrarError("El nombre de la mascota no puede superar los 20 caracteres.");
      $("#nombreMascota").focus();
      return;
    }

    // Contrato de integración: Kevin puede escuchar el evento "carrito:agregar".
    // Se conservan id y cantidad, y se agrega producto con las opciones elegidas.
    const itemCarrito = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      tamano,
      nombreMascota: producto.personalizable ? nombreMascota : "",
      personalizable: Boolean(producto.personalizable),
      cantidad
    };

    document.dispatchEvent(new CustomEvent("carrito:agregar", {
      detail: { id: producto.id, cantidad, producto: itemCarrito }
    }));

    // También se actualiza el contador visual como respuesta inmediata.
    const contador = $("#cartCount");
    if (contador) {
      const actual = Number(contador.textContent) || 0;
      contador.textContent = String(actual + cantidad);
    }

    mostrarAviso(`Agregaste ${cantidad} × ${producto.nombre} al carrito.`);
    $("#formProducto").reset();
    $("#cantidadProducto").value = "1";
  }

  function configurarMenu() {
    const boton = $("#btnMenu");
    const menu = $("#menu");
    if (!boton || !menu) return;
    boton.addEventListener("click", () => {
      const abierto = menu.classList.toggle("open");
      boton.setAttribute("aria-expanded", String(abierto));
      boton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });
  }

  if (producto) {
    renderizarProducto();
    $("#formProducto").addEventListener("submit", agregarAlCarrito);
    $("#formProducto").addEventListener("input", limpiarError);
    $("#formProducto").addEventListener("change", limpiarError);
  } else {
    renderizarProducto();
  }
  configurarMenu();
})();
