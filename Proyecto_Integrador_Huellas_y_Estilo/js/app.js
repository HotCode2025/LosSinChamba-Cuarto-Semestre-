(() => {
  const $ = (s) => document.querySelector(s);
  const CATS = [
    { id: "collares", n: "Collares", e: "🐕" }, { id: "correas", n: "Correas", e: "🦮" },
    { id: "arneses", n: "Arneses", e: "🐕‍🦺" }, { id: "camas", n: "Camas", e: "🛏️" },
    { id: "juguetes", n: "Juguetes", e: "🎾" }, { id: "comederos", n: "Comederos", e: "🥣" },
    { id: "ropa", n: "Ropa", e: "🧥" }
  ];
  const catOf = (id) => CATS.find((c) => c.id === id) || { n: id, e: "🐾" };
  const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
  const money = (n) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Hoy lee los datos de ejemplo. Con el backend: const r = await fetch("/api/productos"); return r.json();
  async function obtenerProductos() { return PRODUCTOS; }

  const state = { q: "", cat: "", tam: "", min: "", max: "", orden: "destacados" };
  let todos = [];

  const tarjeta = (p) => `
    <article class="card">
      <a class="card-img" href="producto.html?id=${p.id}" aria-label="Ver ${esc(p.nombre)}">
        ${p.imagen ? `<img src="${esc(p.imagen)}" alt="${esc(p.nombre)}" loading="lazy">` : `<span aria-hidden="true">${catOf(p.categoria).e}</span>`}
      </a>
      <div class="card-body">
        <div class="tags">${p.personalizable ? '<span class="tag">Personalizable</span>' : ""}<span class="tag tag-s">${esc(catOf(p.categoria).n)}</span></div>
        <h3>${esc(p.nombre)}</h3>
        <p class="desc">${esc(p.descripcion)}</p>
        <p class="tam">Tamaños: ${p.tamanos.map(cap).join(", ")}</p>
        <p class="precio">${money(p.precio)}</p>
        ${p.personalizable
          ? `<a class="btn btn-pri" href="producto.html?id=${p.id}">Personalizar</a>`
          : `<button class="btn btn-pri" data-add="${p.id}">Agregar al carrito</button>`}
      </div>
    </article>`;

  function filtrar() {
    const q = norm(state.q.trim()), min = parseFloat(state.min), max = parseFloat(state.max);
    const orden = {
      menor: (a, b) => a.precio - b.precio, mayor: (a, b) => b.precio - a.precio,
      az: (a, b) => a.nombre.localeCompare(b.nombre, "es"), destacados: (a, b) => b.destacado - a.destacado
    };
    return todos
      .filter((p) =>
        (!q || norm(`${p.nombre} ${p.descripcion} ${catOf(p.categoria).n}`).includes(q)) &&
        (!state.cat || p.categoria === state.cat) &&
        (!state.tam || p.tamanos.includes(state.tam)) &&
        (isNaN(min) || p.precio >= min) && (isNaN(max) || p.precio <= max))
      .sort(orden[state.orden]);
  }

  function render() {
    const r = filtrar();
    $("#grilla").innerHTML = r.map(tarjeta).join("");
    $("#conteo").textContent = `${r.length} ${r.length === 1 ? "producto" : "productos"}`;
    $("#vacio").hidden = r.length > 0;
    guardarURL();
  }

  function guardarURL() {
    try {
      const u = new URLSearchParams();
      Object.entries(state).forEach(([k, v]) => { if (v && !(k === "orden" && v === "destacados")) u.set(k, v); });
      history.replaceState(null, "", u.toString() ? `?${u}` : location.pathname);
    } catch (e) { /* abierto como archivo local: se ignora */ }
  }

  function leerURL() {
    const u = new URLSearchParams(location.search);
    Object.keys(state).forEach((k) => { if (u.has(k)) state[k] = u.get(k); });
  }

  function sincronizarCampos() {
    $("#q").value = state.q; $("#fCat").value = state.cat; $("#pMin").value = state.min;
    $("#pMax").value = state.max; $("#orden").value = state.orden;
    document.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.tam === state.tam)));
  }

  const limpiar = () => { Object.assign(state, { q: "", cat: "", tam: "", min: "", max: "", orden: "destacados" }); sincronizarCampos(); render(); };
  const debounce = (fn, ms = 200) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

  let carrito = 0;
  function aviso(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(aviso.t); aviso.t = setTimeout(() => t.classList.remove("show"), 2200);
  }
  function agregar(id) {
    const p = todos.find((x) => x.id === id); if (!p) return;
    carrito += 1; $("#cartCount").textContent = carrito;
    // El módulo de carrito escucha este evento para guardar el producto.
    document.dispatchEvent(new CustomEvent("carrito:agregar", { detail: { id: p.id, cantidad: 1 } }));
    aviso(`Agregaste "${p.nombre}" al carrito`);
  }

  function alternar(btn, panel) {
    btn.addEventListener("click", () => {
      const abierto = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(abierto));
    });
  }

  async function iniciar() {
    todos = await obtenerProductos();
    leerURL();

    $("#fCat").insertAdjacentHTML("beforeend", CATS.map((c) => `<option value="${c.id}">${c.n}</option>`).join(""));
    $("#categorias").innerHTML = CATS.map((c) => `<button type="button" class="cat" data-cat="${c.id}"><span aria-hidden="true">${c.e}</span>${c.n}</button>`).join("");
    $("#destacados").innerHTML = todos.filter((p) => p.destacado).slice(0, 4).map(tarjeta).join("");
    sincronizarCampos(); render();

    $("#q").addEventListener("input", debounce((e) => { state.q = e.target.value; render(); }));
    $("#fCat").addEventListener("change", (e) => { state.cat = e.target.value; render(); });
    $("#orden").addEventListener("change", (e) => { state.orden = e.target.value; render(); });
    $("#pMin").addEventListener("input", debounce((e) => { state.min = e.target.value; render(); }, 350));
    $("#pMax").addEventListener("input", debounce((e) => { state.max = e.target.value; render(); }, 350));
    $("#chips").addEventListener("click", (e) => {
      const c = e.target.closest(".chip"); if (!c) return;
      state.tam = c.dataset.tam; sincronizarCampos(); render();
    });
    $("#limpiar").addEventListener("click", limpiar);

    document.addEventListener("click", (e) => {
      const add = e.target.closest("[data-add]"); if (add) agregar(Number(add.dataset.add));
      if (e.target.closest("[data-limpiar]")) limpiar();
      const cat = e.target.closest("[data-cat]");
      if (cat) { state.cat = cat.dataset.cat; sincronizarCampos(); render(); $("#catalogo").scrollIntoView({ behavior: "smooth" }); }
    });

    alternar($("#btnMenu"), $("#menu"));
    alternar($("#btnFiltros"), $("#filtros"));
    $("#menu").addEventListener("click", (e) => { if (e.target.tagName === "A") { $("#menu").classList.remove("open"); $("#btnMenu").setAttribute("aria-expanded", "false"); } });
  }

  iniciar();
})();