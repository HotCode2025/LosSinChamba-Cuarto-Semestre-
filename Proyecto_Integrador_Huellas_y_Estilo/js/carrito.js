/* Módulo de Carrito y Checkout - Responsable: Kevin Castilla.
   Persistencia local para el prototipo. El pago real requiere backend Java y credenciales MP. */
(() => {
  "use strict";
  const STORAGE_KEY = "huellas_estilo_carrito";
  const ORDER_KEY = "huellas_estilo_ultimo_pedido";
  const money = n => new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(n);
  const read = () => { try { const x=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]"); return Array.isArray(x)?x:[]; } catch { return []; } };
  let items = read();
  const save = () => { localStorage.setItem(STORAGE_KEY,JSON.stringify(items)); updateBadges(); };
  const count = () => items.reduce((s,p)=>s+p.cantidad,0);
  const subtotal = () => items.reduce((s,p)=>s+p.precio*p.cantidad,0);
  const updateBadges = () => document.querySelectorAll("#cartCount").forEach(el=>el.textContent=String(count()));
  const cleanText = v => String(v||"").trim();
  function add(detail={}) {
    const p=detail.producto || detail;
    const id=Number(p.id ?? detail.id), qty=Number(detail.cantidad ?? p.cantidad ?? 1);
    if(!Number.isInteger(id)||!Number.isInteger(qty)||qty<1) return;
    const name=cleanText(p.nombre)||"Producto";
    const price=Number(p.precio);
    if(!Number.isFinite(price)||price<0) return;
    const size=cleanText(p.tamano), pet=cleanText(p.nombreMascota);
    const key=[id,size,pet].join("|");
    const found=items.find(x=>x.key===key);
    if(found) found.cantidad=Math.min(20,found.cantidad+qty);
    else items.push({key,id,nombre:name,precio:price,imagen:cleanText(p.imagen),tamano:size,nombreMascota:pet,cantidad:Math.min(20,qty)});
    save();
  }
  function change(key,delta) {
    const p=items.find(x=>x.key===key); if(!p)return;
    p.cantidad=Math.max(1,Math.min(20,p.cantidad+delta)); save(); renderCart();
  }
  function remove(key) { items=items.filter(x=>x.key!==key); save(); renderCart(); }
  function renderCart() {
    const host=document.querySelector("#cartItems"); if(!host)return;
    const empty=document.querySelector("#cartEmpty"), content=document.querySelector("#cartContent");
    empty.hidden=items.length>0; content.hidden=items.length===0;
    host.innerHTML=items.map(p=>`
      <article class="cart-item">
        <img src="${escapeHTML(p.imagen||"")}" alt="${escapeHTML(p.nombre)}" onerror="this.style.display='none'">
        <div class="cart-item-info">
          <h3>${escapeHTML(p.nombre)}</h3>
          <p>${p.tamano?`Tamaño: ${escapeHTML(p.tamano)}`:""} ${p.nombreMascota?`· Personalizado para ${escapeHTML(p.nombreMascota)}`:""}</p>
          <strong>${money(p.precio)}</strong>
          <div class="qty-controls" aria-label="Cambiar cantidad">
            <button type="button" data-minus="${escapeHTML(p.key)}" aria-label="Disminuir cantidad">−</button>
            <span>${p.cantidad}</span>
            <button type="button" data-plus="${escapeHTML(p.key)}" aria-label="Aumentar cantidad">+</button>
            <button type="button" class="remove-item" data-remove="${escapeHTML(p.key)}">Eliminar</button>
          </div>
        </div>
        <strong class="line-total">${money(p.precio*p.cantidad)}</strong>
      </article>`).join("");
    document.querySelector("#cartSubtotal").textContent=money(subtotal());
    document.querySelector("#cartTotal").textContent=money(subtotal());
    document.querySelector("#checkoutTotal").textContent=money(subtotal());
    updateBadges();
  }
  function escapeHTML(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function showStep(step) {
    document.querySelectorAll("[data-step]").forEach(el=>el.hidden=el.dataset.step!==step);
    document.querySelectorAll("[data-step-indicator]").forEach(el=>el.classList.toggle("active",el.dataset.stepIndicator===step));
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function confirmOrder(order, clear=true) {
    sessionStorage.setItem(ORDER_KEY,JSON.stringify(order));
    if(clear){items=[];save();}
    showStep("confirmation");
    const target=document.querySelector("#confirmationSummary");
    if(target) target.innerHTML=`
      <p><strong>Número de pedido:</strong> ${escapeHTML(order.numero)}</p>
      <p><strong>Cliente:</strong> ${escapeHTML(order.cliente.nombre)}</p>
      <p><strong>Envío:</strong> ${escapeHTML(order.envio.direccion)}, ${escapeHTML(order.envio.localidad)}</p>
      <p><strong>Forma de pago:</strong> ${escapeHTML(order.pago)}</p>
      <p><strong>Total:</strong> ${money(order.total)}</p>
      <ul>${order.items.map(p=>`<li>${p.cantidad} × ${escapeHTML(p.nombre)} — ${money(p.precio*p.cantidad)}</li>`).join("")}</ul>`;
  }
  async function checkout(event) {
    event.preventDefault();
    const form=event.currentTarget;
    if(!items.length)return;
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const order={
      numero:"HE-"+Date.now().toString().slice(-8),
      fecha:new Date().toISOString(),
      cliente:{nombre:cleanText(data.get("nombre")),email:cleanText(data.get("email")),telefono:cleanText(data.get("telefono"))},
      envio:{direccion:cleanText(data.get("direccion")),localidad:cleanText(data.get("localidad")),provincia:cleanText(data.get("provincia")),cp:cleanText(data.get("cp")),referencia:cleanText(data.get("referencia"))},
      items:items.map(p=>({...p})), total:subtotal(), pago:"Pendiente"
    };
    const btn=document.querySelector("#payButton"); btn.disabled=true; btn.textContent="Conectando...";
    try {
      // Endpoint esperado en el backend Java. El servidor crea la preferencia usando el access token privado.
      const response=await fetch("http://localhost:8080/api/pagos/preferencia",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(order)});
      if(!response.ok) {
        let detail="No se pudo crear la preferencia de pago.";
        try { const body=await response.json(); if(body.message) detail=body.message; } catch {}
        throw new Error(detail);
      }
      const result=await response.json();
      if(!result.init_point) throw new Error("El servidor no devolvió init_point");
      sessionStorage.setItem(ORDER_KEY,JSON.stringify({...order,pago:"En proceso",preferenceId:result.id}));
      window.location.href=result.init_point;
    } catch(error) {
      document.querySelector("#paymentError").textContent=error.message || "No se pudo conectar con el servidor de pagos. Verificá que el backend Java esté iniciado y que Mercado Pago esté configurado.";
      document.querySelector("#paymentError").hidden=false;
      btn.disabled=false; btn.textContent="Pagar con Mercado Pago";
    }
  }
  document.addEventListener("carrito:agregar",e=>add(e.detail));
  document.addEventListener("click",e=>{
    const plus=e.target.closest("[data-plus]"), minus=e.target.closest("[data-minus]"), del=e.target.closest("[data-remove]");
    if(plus)change(plus.dataset.plus,1);
    if(minus)change(minus.dataset.minus,-1);
    if(del)remove(del.dataset.remove);
  });
  document.addEventListener("DOMContentLoaded",()=>{
    updateBadges(); renderCart();
    const form=document.querySelector("#checkoutForm"); if(form)form.addEventListener("submit",checkout);
    const next=document.querySelector("#goCheckout");
    if(next)next.addEventListener("click",()=>{if(items.length)showStep("checkout");});
    const back=document.querySelector("#backCart"); if(back)back.addEventListener("click",()=>showStep("cart"));
    const retry=document.querySelector("#returnCart"); if(retry)retry.addEventListener("click",()=>showStep("cart"));
    const query=new URLSearchParams(location.search);
    if(query.has("payment")) {
      const saved=JSON.parse(sessionStorage.getItem(ORDER_KEY)||"null");
      if(saved){
        const status=query.get("payment");
        const messages={success:["Pago informado como aprobado","Mercado Pago informó un resultado aprobado. El estado definitivo debe verificarse en el servidor antes de marcar el pedido como pagado."],failure:["Pago no aprobado","El pago fue rechazado o no pudo completarse. Podés volver al carrito e intentarlo nuevamente."],pending:["Pago pendiente","Mercado Pago informó que el pago está pendiente de acreditación."]};
        const result=messages[status] || ["Resultado del pago","Mercado Pago devolvió al usuario a la tienda."];
        saved.pago=result[0];
        confirmOrder(saved,false);
        const title=document.querySelector("#confirmationTitle");
        const message=document.querySelector("#confirmationMessage");
        if(title)title.textContent=result[0];
        if(message)message.textContent=result[1];
      }
    }
  });
  // API pública para mantener compatibilidad con las páginas existentes.
  window.HuellasCart={add,getItems:()=>items.map(p=>({...p})),getTotal:subtotal};
})();