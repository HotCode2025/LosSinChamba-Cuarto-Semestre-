const shopContent = document.getElementById("shopContent");
window.cartCounter = window.cartCounter || document.getElementById("cart-counter");

// Array global compartido con cart.js
window.cart = window.cart || [];

// 4.1 - Contador de productos en el botón del carrito
window.updateCartCounter = () => {
  const totalUnits = window.cart.reduce((acc, product) => acc + (product.quanty || 0), 0);

  window.cartCounter.innerText = totalUnits;
  window.cartCounter.style.display = totalUnits === 0 ? "none" : "grid";
};

// Renderizar catálogo
productos.forEach((product) => {
  const content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <img src="${product.img}" alt="${product.productName}">
    <h3>${product.productName}</h3>
    <p class="price">${product.price} $</p>
  `;
  shopContent.append(content);

  const buyButton = document.createElement("button");
  buyButton.innerText = "Buy";
  content.append(buyButton);

  buyButton.addEventListener("click", () => {
    const repeat = window.cart.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
      window.cart.forEach((prod) => {
        if (prod.id === product.id) {
          prod.quanty = (prod.quanty || 1) + 1;
        }
      });
    } else {
      window.cart.push({
        id: product.id,
        productName: product.productName,
        price: product.price,
        quanty: 1, // <-- Importante: arranca siempre en 1
        img: product.img,
      });
    }

    window.updateCartCounter();
  });
});

// Estado inicial del contador al cargar
window.updateCartCounter(); 