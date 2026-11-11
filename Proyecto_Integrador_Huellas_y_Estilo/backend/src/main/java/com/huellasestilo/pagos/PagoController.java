package com.huellasestilo.pagos;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.client.RestClient;
import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {
    private final ObjectMapper mapper = new ObjectMapper();
    private final RestClient mercadoPago = RestClient.builder()
            .baseUrl("https://api.mercadopago.com")
            .build();

    @PostMapping("/preferencia")
    public Map<String, Object> crearPreferencia(@RequestBody JsonNode orden) {
        String accessToken = System.getenv("MP_ACCESS_TOKEN");
        if (accessToken == null || accessToken.isBlank()) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "Falta configurar MP_ACCESS_TOKEN con el Access Token de prueba.");
        }
        JsonNode items = orden.path("items");
        if (!items.isArray() || items.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El carrito está vacío.");
        }

        List<Map<String, Object>> mpItems = new ArrayList<>();
        BigDecimal totalCalculado = BigDecimal.ZERO;
        for (JsonNode item : items) {
            String title = item.path("nombre").asText("Producto Huellas & Estilo");
            BigDecimal unitPrice = item.path("precio").decimalValue();
            int quantity = item.path("cantidad").asInt(0);
            if (unitPrice.signum() < 0 || quantity < 1) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Hay productos con precio o cantidad inválidos.");
            }
            totalCalculado = totalCalculado.add(unitPrice.multiply(BigDecimal.valueOf(quantity)));
            Map<String, Object> mpItem = new LinkedHashMap<>();
            mpItem.put("title", title);
            mpItem.put("quantity", quantity);
            mpItem.put("unit_price", unitPrice);
            mpItem.put("currency_id", "ARS");
            mpItems.add(mpItem);
        }

        Map<String, Object> payer = new LinkedHashMap<>();
        JsonNode cliente = orden.path("cliente");
        if (!cliente.path("email").asText("").isBlank()) payer.put("email", cliente.path("email").asText());
        if (!cliente.path("nombre").asText("").isBlank()) {
            String[] parts = cliente.path("nombre").asText().trim().split("\\s+", 2);
            payer.put("name", parts[0]);
            if (parts.length > 1) payer.put("surname", parts[1]);
        }

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("items", mpItems);
        body.put("payer", payer);
        body.put("external_reference", orden.path("numero").asText(UUID.randomUUID().toString()));
        body.put("statement_descriptor", "HUELLAS Y ESTILO");

        try {
            JsonNode response = mercadoPago.post()
                    .uri("/checkout/preferences")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .body(JsonNode.class);
            if (response == null || response.path("init_point").asText("").isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "Mercado Pago no devolvió el enlace de pago.");
            }
            return Map.of("id", response.path("id").asText(), "init_point", response.path("init_point").asText(), "total", totalCalculado);
        } catch (ResponseStatusException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY,
                    "No se pudo crear el checkout en Mercado Pago. Revisá las credenciales de prueba.", ex);
        }
    }
}
