const express = require("express");
const cors = require("cors");
const path = require("path");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();
const PORT = process.env.PORT || 3000;

// Variables de entorno o valores por defecto
const MP_PUBLIC_KEY = process.env.MP_PUBLIC_KEY || "TEST-TU-PUBLIC-KEY-AQUI";
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || "TEST-TU-ACCESS-TOKEN-AQUI";

// Inicializar cliente de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: MP_ACCESS_TOKEN,
});

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "public")));

// 1. Ruta para entregar la Public Key al frontend
app.get("/api/public-key", (req, res) => {
  res.json({ publicKey: MP_PUBLIC_KEY });
});

// 2. Ruta para crear la preferencia de pago
app.post("/create_preference", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío" });
    }

    const preference = new Preference(client);

    const preferenceData = {
      body: {
        items: items.map((item) => ({
          id: String(item.id),
          title: String(item.title),
          quantity: Number(item.quantity),
          unit_price: Number(item.unit_price),
          currency_id: "ARS",
        })),
       back_urls: {
          success: `http://localhost:${PORT}/`,
          failure: `http://localhost:${PORT}/`,
          pending: `http://localhost:${PORT}/`,
        },
      },
    };

    const response = await preference.create(preferenceData);

    res.json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.error("Error al crear preferencia:", error);
    res.status(500).json({ error: "Error al generar la orden en Mercado Pago" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});