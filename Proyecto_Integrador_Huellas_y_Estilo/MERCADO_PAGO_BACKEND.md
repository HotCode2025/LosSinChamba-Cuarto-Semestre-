# Mercado Pago Checkout Pro - demostración local sencilla

Esta versión permite ejecutar la tienda y el backend en localhost y redirigir al checkout de prueba de Mercado Pago. No requiere ngrok ni URL pública porque no configura el retorno automático a la tienda.

## Requisitos
- Java 17
- Maven
- Credenciales de prueba de una aplicación creada en Mercado Pago Developers

## Iniciar backend en VS Code (Windows PowerShell)
1. Abrí la carpeta `backend` en la terminal integrada de VS Code.
2. Ejecutá: ` $env:MP_ACCESS_TOKEN="TEST-TU_ACCESS_TOKEN" ` reemplazando el texto por tu Access Token de prueba.
3. Ejecutá: `mvn spring-boot:run`
4. Dejá esa terminal abierta. El backend queda disponible en `http://localhost:8080`.

## Iniciar frontend
Abrí `index.html` con Live Server. Cuando completes el checkout y presiones **Pagar con Mercado Pago**, la tienda enviará la orden al backend local. El backend creará la preferencia y el navegador abrirá el `init_point` de Mercado Pago.

## Importante
- Usá únicamente credenciales de prueba (`TEST-...`).
- No compartas el Access Token ni lo subas a GitHub.
- En este modo simple, el usuario llega a Mercado Pago pero no vuelve automáticamente a localhost al finalizar. Para configurar el retorno automático se necesita una URL HTTPS pública.
- Esta integración es para demostración académica. En producción se debe verificar el estado del pago desde el servidor mediante la API o Webhooks.
