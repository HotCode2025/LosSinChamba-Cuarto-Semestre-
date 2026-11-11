/*
  4.2 - Método de pago con Mercado Pago (frontend)
*/

const API_URL = "http://localhost:3000";

let mpPublicKey = null;
let walletBrick = null;

const getPublicKey = async () => {
  if (mpPublicKey !== null) return mpPublicKey;

  try {
    const response = await fetch(`${API_URL}/api/public-key`);
    const data = await response.json();
    mpPublicKey = data.publicKey || "";
    return mpPublicKey;
  } catch (err) {
    console.error("Error al obtener la public key:", err);
    return "";
  }
};

const createPreference = async () => {
  const itemsMapeados = (typeof cart !== "undefined" && cart.length > 0) 
    ? cart.map((product) => ({
        id: String(product.id || "1"),
        title: String(product.productName || product.title || product.nombre || "Accesorio Canino Premium"),
        quantity: Number(product.quanty || product.quantity || product.cantidad || 1),
        unit_price: Number(product.price || product.unit_price || 100000),
        currency_id: "ARS",
      }))
    : [{
        id: "101",
        title: "Kit Premium Accesorio Canino - Huellas & Estilo",
        quantity: 1,
        unit_price: 100000,
        currency_id: "ARS"
      }];

  const response = await fetch(`${API_URL}/create_preference`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: itemsMapeados }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "El servidor no pudo crear la preferencia");
  }

  return data;
};

const renderMercadoPagoButton = async (preference, container) => {
  if (walletBrick) {
    walletBrick.unmount();
    walletBrick = null;
  }

  container.innerHTML = "";

  const publicKey = await getPublicKey();

  if (!publicKey || typeof MercadoPago === "undefined") {
    const link = document.createElement("a");
    link.className = "checkout-btn";
    link.href = preference.sandbox_init_point || preference.init_point;
    link.target = "_blank";
    link.rel = "noopener";
    link.innerText = "Ir a Pagar en Mercado Pago";
    container.append(link);
    return;
  }

  try {
    const mp = new MercadoPago(publicKey, { locale: "es-AR" });

    walletBrick = await mp.bricks().create("wallet", container.id, {
      initialization: {
        preferenceId: preference.id,
        redirectMode: "modal", 
      },
      customization: { texts: { valueProp: "smart_option" } },
    });
  } catch (error) {
    console.warn("Fallo al montar el Brick, usando redirección directa:", error);
    window.location.href = preference.sandbox_init_point || preference.init_point;
  }
};

const createCheckoutSection = () => {
  const section = document.createElement("div");
  section.className = "checkout";

  const payButton = document.createElement("button");
  payButton.className = "checkout-btn";
  payButton.innerText = "Pagar con Mercado Pago";

  const status = document.createElement("p");
  status.className = "checkout-status";

  const walletContainer = document.createElement("div");
  walletContainer.id = "wallet_container";

  section.append(payButton, status, walletContainer);

  payButton.addEventListener("click", async () => {
    payButton.disabled = true;
    status.innerText = "Generando la orden de pago...";

    try {
      const preference = await createPreference();
      await renderMercadoPagoButton(preference, walletContainer);

      payButton.style.display = "none";
      status.innerText = "Elegí cómo querés pagar 👇";
    } catch (error) {
      console.error(error);
      status.innerText = `No se pudo generar el pago: ${error.message}`;
      payButton.disabled = false;
    }
  });

  return section;
};