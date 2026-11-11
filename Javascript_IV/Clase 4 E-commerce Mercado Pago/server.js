const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configura tus credenciales del .env o usa las credenciales TEST por defecto
const MP_PUBLIC_KEY = process.env.MP_PUBLIC_KEY || "TEST-52a0f0a9-97f5-4700-8f4c-d417cba2f935";
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || "TEST-4054841682308918-100516-d18d8e655e59f717d9a76c8cbb1b8340-3738216829";

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 1. Ruta para entregar la Public Key al frontend
app.get("/api/public-key", (req, res) => {
  res.json({ publicKey: MP_PUBLIC_KEY });
});

// 2. Ruta para crear la preferencia de pago
app.post("/create_preference", async (req, res) => {
  try {
    const { items } = req.body;

    // Si no vienen ítems o el carrito está vacío, creamos la orden por $100.000
    const cartItems = (items && items.length > 0) ? items : [
      {
        id: "101",
        title: "Kit Premium Accesorio Canino - Huellas & Estilo",
        quantity: 1,
        unit_price: 100000
      }
    ];

    // Petición directa a la API de Mercado Pago
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        items: cartItems.map((item) => ({
          id: String(item.id || "100"),
          title: String(item.title || "Producto Premium"),
          quantity: Number(item.quantity || 1),
          currency_id: "ARS",
          unit_price: Number(item.unit_price || 100000)
        })),
        back_urls: {
          success: `http://localhost:${PORT}/`,
          failure: `http://localhost:${PORT}/`,
          pending: `http://localhost:${PORT}/`
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error devuelto por Mercado Pago:", data);
      return res.status(response.status).json({ 
        error: data.message || "Error al crear la preferencia en Mercado Pago" 
      });
    }

    res.json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point || data.init_point
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error interno al generar la preferencia" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Servidor listo en: http://localhost:${PORT}`);
  console.log(`====================================================`);
});