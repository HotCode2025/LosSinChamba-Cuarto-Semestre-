// Se toman las variables existentes o se buscan si no estaban declaradas
window.modalContainer = window.modalContainer || document.getElementById("modal-container");
window.modalOverlay = window.modalOverlay || document.getElementById("modal-overlay");
window.cartBtn = window.cartBtn || document.getElementById("cart-btn");
window.cartCounter = window.cartCounter || document.getElementById("cart-counter");

// Función del contador (unificada)
const displayCartCounter = () => {
  if (typeof cart === "undefined") return;
  const cartLength = cart.reduce((acc, el) => acc + (el.quanty || 1), 0);
  if (cartLength > 0) {
    cartCounter.style.display = "flex";
    cartCounter.innerText = cartLength;
  } else {
    cartCounter.style.display = "none";
  }
};

const displayCart = () => {
  modalContainer.style.display = "flex";
  modalOverlay.style.display = "block";

  modalContainer.innerHTML = "";

  // modal Header
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const modalTitle = document.createElement("h3");
  modalTitle.innerText = "Carrito de Compras";
  modalTitle.className = "modal-title";
  modalHeader.append(modalTitle);

  const modalClose = document.createElement("div");
  modalClose.innerText = "✕";
  modalClose.className = "modal-close";
  modalHeader.append(modalClose);

  modalClose.addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
  });

  modalContainer.append(modalHeader);

  // modal Body
  if (!window.cart || cart.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "cart-empty";
    emptyMessage.innerText = "El carrito está vacío 🛒";
    modalContainer.append(emptyMessage);
    return;
  }

  const productsWrapper = document.createElement("div");
  productsWrapper.className = "cart-products-list";

  cart.forEach((product) => {
    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalBody.innerHTML = `
      <div class="product">
        <img class="product-img" src="${product.img}" alt="${product.productName}" />
        <div class="product-info">
          <h4>${product.productName}</h4>
          <span class="unit-price">$${product.price}</span>
        </div>
        <div class="quantity">
          <button class="quantity-btn-decrese">-</button>
          <span class="quantity-input">${product.quanty}</span>
          <button class="quantity-btn-increse">+</button>
        </div>
        <div class="price">$${product.price * product.quanty}</div>
        <div class="delete-product" title="Eliminar">🗑️</div>
      </div>
    `;
    productsWrapper.append(modalBody);

    // Botón restar (-)
    const decrese = modalBody.querySelector(".quantity-btn-decrese");
    decrese.addEventListener("click", () => {
      if (product.quanty > 1) {
        product.quanty--;
      } else {
        const foundId = cart.findIndex((element) => element.id === product.id);
        cart.splice(foundId, 1);
      }
      displayCartCounter();
      displayCart();
    });

    // Botón sumar (+)
    const increse = modalBody.querySelector(".quantity-btn-increse");
    increse.addEventListener("click", () => {
      product.quanty++;
      displayCartCounter();
      displayCart();
    });

    // Botón eliminar
    const deleteProduct = modalBody.querySelector(".delete-product");
    deleteProduct.addEventListener("click", () => {
      const foundId = cart.findIndex((element) => element.id === product.id);
      cart.splice(foundId, 1);
      displayCartCounter();
      displayCart();
    });
  });

  modalContainer.append(productsWrapper);

  // modal Footer (Cálculo del total)
  const total = cart.reduce((acc, el) => acc + el.price * el.quanty, 0);

  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";
  modalFooter.innerHTML = `
    <div class="total-container">
      <span>Total:</span>
      <span class="total-price">$${total}</span>
    </div>
  `;

  // Botón de pago (checkout)
  if (typeof createCheckoutSection === "function") {
    modalFooter.append(createCheckoutSection());
  }

  modalContainer.append(modalFooter);
};

// Eventos de apertura y cierre
if (cartBtn) {
  cartBtn.addEventListener("click", displayCart);
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
  });
}

// Inicializar estado del contador al cargar
displayCartCounter();