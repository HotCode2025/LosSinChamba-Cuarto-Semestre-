# Huellas & Estilo - E-commerce de Accesorios para Perros 🐾

## 📋 Sobre el Proyecto
Proyecto Integrador Final para la Tecnicatura en Programación (UTN - Facultad regional San Rafael). 
Es una tienda online (e-commerce) dedicada a la venta de accesorios para perros, planificada y desarrollada bajo el marco de trabajo Scrum.

## 👥 Equipo: Los sin chamba
En este proyecto académico, **todos los integrantes asumen el rol de Developers (Desarrolladores)** aportando al código, además de cumplir con roles complementarios de Scrum para la organización del equipo.

| Integrante | Rol Principal | Rol Scrum / Foco |
| :--- | :--- | :--- |
| **Baz Samira** | Developer | Product Owner |
| **Rasgido Mariano** | Developer | Scrum Master |
| **Castilla Kevin** | Developer | Referente Frontend / UX-UI |
| **Diaz Ezequiel** | Developer | Referente Backend / Base de datos |

## 🧩 Distribución de Módulos y Asignaciones
El desarrollo del e-commerce se divide en 4 módulos principales para que todos participen equitativamente en el código:

1. **Módulo de Catálogo y Búsqueda (Asignado a: Samira Baz):** Página de inicio, listado de productos, filtros (categoría, tamaño, precio) y buscador.
2. **Módulo de Producto y Personalización (Asignado a: Mariano Rasgido):** Página de detalle del producto, galería de imágenes y lógica para personalizar con el nombre de la mascota.
3. **Módulo de Carrito y Checkout (Asignado a: Kevin Castilla):** Lógica del carrito de compras, cálculo de totales, integración con Mercado Pago (Sandbox) y confirmación de envío.
4. **Módulo de Usuarios y Administración (Asignado a: Ezequiel Diaz):** Registro/login de usuarios, historial de pedidos y panel CRUD para que el administrador gestione productos y stock.

## 🛠️ Tecnologías
- **Frontend:** HTML5, CSS3, Sass, JavaScript (ES6)
- **Backend:** Java
- **Base de Datos:** MongoDB
- **Pasarela de Pagos:** Mercado Pago (Sandbox)
- **Diseño y Gestión:** Figma, GitHub, GitHub Projects

## 🌿 Flujo de Trabajo y Ramas (Git)
Para mantener la organización de forma sencilla dentro del repositorio de la materia:

- **Ramas personales:** Cada integrante desarrollará su módulo directamente en su rama personal ya existente. 
- **Integración:** Una vez terminado el módulo (o avances importantes), se integrará el código para ir armando el proyecto final.

*(Nota: Mantener commits con mensajes claros sobre lo que se está subiendo, ej: "Agrego maquetado del catálogo").*

## 🚀 Planificación de Sprints
- **Sprint 0:** Brief, definición del producto, wireframes en Figma, configuración del repositorio y tablero.
- **Sprint 1:** Estructura base, catálogo, filtros y detalle de producto.
- **Sprint 2:** Buscador, carrito, registro e inicio de sesión.
- **Sprint 3:** Pagos, envío, confirmación y panel de administración de productos.
- **Sprint 4:** Gestión de pedidos, historial, pruebas finales, correcciones y presentación.


## 🛒 Módulo de Carrito y Checkout — Kevin Castilla

Se incorporó el módulo `carrito.html`, junto con `js/carrito.js` y `css/carrito.css`.

### Funcionalidades
- Recibe productos agregados desde el catálogo y desde el detalle del producto mediante el evento `carrito:agregar`.
- Guarda el carrito en `localStorage`, por lo que los productos se mantienen al cambiar de página o recargar.
- Agrupa variantes iguales (producto, tamaño y nombre personalizado), permite aumentar/disminuir cantidades y eliminar artículos.
- Calcula subtotal y total automáticamente en pesos argentinos.
- Solicita datos del comprador y dirección de envío, valida los campos y muestra el resumen de la orden.
- Incluye un modo de demostración para recorrer el checkout sin cobrar dinero.

### Integración con Mercado Pago Checkout Pro (Sandbox)
El checkout utiliza el backend Java ubicado en `backend/`. Al presionar **Pagar con Mercado Pago**, el frontend solicita `POST http://localhost:8080/api/pagos/preferencia`; el backend crea una preferencia con el Access Token de prueba y devuelve `init_point` para abrir el Checkout Pro de Mercado Pago.

**Modo sencillo para la demostración local:** no se configuran URLs de retorno. El comprador sale de la tienda y llega al checkout de prueba de Mercado Pago. Así se puede mostrar el flujo de pago sin usar ngrok ni publicar el proyecto. Para volver automáticamente a la tienda después del pago, Mercado Pago requiere una URL pública HTTPS, pero eso no es necesario para esta demostración.

Para ejecutarlo se necesita Java 17 y Maven. En una terminal PowerShell abierta dentro de `backend`, configurá el Access Token de prueba y ejecutá `mvn spring-boot:run`:

```powershell
$env:MP_ACCESS_TOKEN="TEST-TU_ACCESS_TOKEN"
mvn spring-boot:run
```

Luego abrí `index.html` con Live Server. El botón de pago abre el checkout de Mercado Pago usando `init_point`. No compartas ni subas el Access Token al repositorio. Para producción se deben verificar los pagos desde el servidor mediante la API y/o Webhooks, y validar los precios contra la base de datos.
