/* Lista de regalos — Camila y Matías
   Si ENDPOINT está vacío, las reservas se guardan solo en este navegador (modo prueba).
   Para que todos los invitados vean las mismas reservas, pegá acá la URL del Apps Script (ver LEEME.md). */
const ENDPOINT = "https://script.google.com/macros/s/AKfycbwAmG11c0MSOYxdpkSftZDHA6s_A4-MXUHE6xi3Q2JLupdUHg5yAwr21BXjO_3ZFvUv/exec";
const REGALOS = [
  { id: "licuadora",  nombre: "Licuadora",        desc: "Para los licuados del desayuno y las sopas de invierno.", foto:"img/licuadora.png",
  precio: "$165.000", link: "https://www.mercadolibre.com.ar/p/MLA65197014?matt_tool=89488245&pdp_filters=item_id:MLA2827743388&ua=JbHk7ojNbaK_zEL_U2xHveaguCheyl_w6kYb0ddB3Ql4siix#origin=share&sid=share&wid=MLA2827743388&action=copy", tienda: "Mercado Libre" },
  { id: "Tostadora",    nombre: "Tostadora", desc: "Para disfrutar de desayunos y meriendas con tostadas calentitas y crocantes." , foto:"img/tostadora.png", precio: "$60.000", link: "https://www.mercadolibre.com.ar/p/MLA53189989?matt_tool=89488245&pdp_filters=item_id:MLA2207213622&ua=FTBNGZCXrvmB5tvtOKi-hem932V0PAYXxkCEGFmy5MSBpz8h#origin=share&sid=share&wid=MLA2207213622&action=copy", tienda: "Mercado Libre" },
  { id: "ollas",      nombre: "Set de ollas",     desc: "Para estrenar la cocina de casados con muchas comidas ricas.", foto:"img/ollas.png" , precio: "$160.900", link: "https://www.mercadolibre.com.ar/up/MLAU3095805018?matt_tool=89488245&pdp_filters=item_id:MLA1754715793&ua=DmBOyNu6wrpDWwrRootwonEMUiS0JJw_oV1Q-hEuE-hKj8sg#origin=share&sid=share&wid=MLA1754715793&action=copy", tienda: "Mercado Libre" },
  { id: "cafetera",   nombre: "Cafetera",         desc: "Porque los domingos arrancan mejor con un buen café." , foto:"img/cafetera.png" , precio: "$35.000", link: "https://www.mercadolibre.com.ar/p/MLA53513299?matt_tool=89488245&pdp_filters=item_id:MLA3128049572&ua=jcWIwiQfl_lwH_hLYYzgs4k3vxJePIRbzbdZ3mAETCXDGWyd#origin=share&sid=share&wid=MLA3128049572&action=copy", tienda: "Mercado Libre"} ,
  { id: "Tabla para picar",    nombre: "Tabla para picar",   desc: "Tabla para picar de acero inoxidable.", foto:"img/tablaacero.png" , precio: "$47.300", link: "https://www.mercadolibre.com.ar/p/MLA78851386?matt_tool=89488245&pdp_filters=item_id:MLA3907371250&ua=AkmzSwxbNj4ubu9-Bg-WQRcvminYKrlJt5VR1ERl1hX94FHm#origin=share&sid=share&wid=MLA3907371250&action=copy", tienda: "Mercado Libre"},
  { id: "aspiradora", nombre: "Aspiradora", desc: "Que la casa quede impecable mientras disfrutamos." , foto:"img/aspiradora.png", precio: "$108.000", link: "https://www.mercadolibre.com.ar/p/MLA42227624?matt_tool=89488245&pdp_filters=item_id:MLA1961341706&ua=aoL-pmuQG5_g7TbH8R0Bk0tCCfG9iqkXqilWndbrj0yJH5SO#origin=share&sid=share&wid=MLA1961341706&action=copy", tienda: "Mercado Libre"},
  { id: "Especieros",      nombre: "Especieros", desc: "Para tener nuestras especias siempre ordenadas y darle ese toque especial a cada comida.", foto:"img/especieros.png" , precio: "$30.000", link: "https://www.mercadolibre.com.ar/up/MLAU4624166190?matt_tool=89488245&pdp_filters=item_id:MLA3739263552&ua=_F0araCwB37-KjrW3dn3frh08ZbldYgE45AsVjS-xt39eM2E#origin=share&sid=share&wid=MLA3739263552&action=copy", tienda: "Mercado Libre"},
  { id: "Tuppers hermeticos",      nombre: "Tuppers hermeticos",   desc: "Para guardar, organizar y conservar nuestras comidas de todos los días." ,foto:"img/tuppers.png" , precio: "$20.000", link: "https://www.mercadolibre.com.ar/up/MLAU3313275355?matt_tool=89488245&pdp_filters=item_id:MLA2194756892&ua=8Rm4wMbmSIrlzFduHEi-N4riO8ufpO0QFhjXoJFHBwaAKiGJ#origin=share&sid=share&wid=MLA2194756892&action=copy", tienda: "Mercado Libre"},
  { id: "minipimer",     nombre: "minipimer", desc: "ara preparar salsas, cremas y muchas recetas de forma rápida y práctica." , foto:"img/minipimer.png", precio: "$62.000", link: "https://www.mercadolibre.com.ar/p/MLA76760001?matt_tool=89488245&pdp_filters=item_id:MLA2027168135&ua=javHuhtiBlttlr0lxGoANJbnhFm_G58Zo3RIgdWdHRt3ssXp#origin=share&sid=share&wid=MLA2027168135&action=copy", tienda: "Mercado Libre"},
  { id: "Utensillos de silicona",  nombre: "Utensillos de silicona",        desc: "Para cocinar con comodidad y tener todo lo necesario a mano para nuestras recetas." , foto:"img/silicona.png", precio: "$15.000", link: "https://www.mercadolibre.com.ar/up/MLAU3033123718?matt_tool=89488245&pdp_filters=item_id:MLA3121425408&ua=5o0Gk4NOgP3djmoXfogyywbhOiEs7yGD_8yaE9LVQEYSZqEv#origin=share&sid=share&wid=MLA3121425408&action=copy", tienda: "Mercado Libre"},
  { id: "Yogurtera",    nombre: "Yogurtera", desc: "Para preparar yogures caseros, ricos y saludables, disfrutando de algo hecho en casa." , foto:"img/yogurt.png", precio: "$53.000", link: "https://www.mercadolibre.com.ar/p/MLA47847071?matt_tool=89488245&pdp_filters=item_id:MLA1428661935&ua=QeasIW57UiWObLlKjd_won6RQX--Qxu6Nk53L6l6PzkIBA2O#origin=share&sid=share&wid=MLA1428661935&action=copy", tienda: "Mercado Libre"},
  { id: "pava",       nombre: "Pava eléctrica",   desc: "Agua caliente al instante para el mate de cada tarde." , foto:"img/pava.png", precio: "$75.240", link: "https://www.mercadolibre.com.ar/p/MLA47275624?matt_tool=89488245&pdp_filters=item_id:MLA1580312973&ua=ZuuC2jGEr5630mMGumzyQJ367PXrF0pIXmT0U6tpiD4xL5_i#origin=share&sid=share&wid=MLA1580312973&action=copy", tienda: "Mercado Libre"}
];
// Datos opcionales por regalo: precio: "$85.000", link: "https://..." y tienda: "Mercado Libre" (nombre que se ve en lugar del link; si falta, se muestra el sitio). Lo que falte no se muestra.
const FOTO = "img/regalo.svg"; // foto genérica; para una foto real agregá `foto: "img/xxx.jpg"` al regalo

const $ = (id) => document.getElementById(id);
const grid = $("grid"), modal = $("modal"), form = $("form"), inputNombre = $("nombre");
const errorEl = $("error"), confirmar = $("confirmar"), estado = $("estado");
let reservas = {};   // { idRegalo: nombre }
let actual = null;
let ultimoBoton = null;

/* ---------- almacenamiento ---------- */
// Cada reserva guarda una clave en este dispositivo: solo quien reservó puede quitarla.
let claves = {};
try { claves = JSON.parse(localStorage.getItem("claves") || "{}"); } catch {}
function guardarClaves() { try { localStorage.setItem("claves", JSON.stringify(claves)); } catch {} }
const nuevaClave = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2));

async function cargar() {
  if (!ENDPOINT) {
    try { return JSON.parse(localStorage.getItem("reservas") || "{}"); } catch { return {}; }
  }
  const r = await fetch(ENDPOINT);
  if (!r.ok) throw new Error("No se pudo cargar");
  return (await r.json()).reservas || {};
}

async function enviar(datos) {
  if (!ENDPOINT) { // modo prueba: todo queda en este navegador
    const todas = await cargar();
    if (datos.accion === "cancelar") delete todas[datos.id];
    else if (todas[datos.id]) return { ok: false, ocupado: true, reservas: todas };
    else todas[datos.id] = datos.nombre;
    try { localStorage.setItem("reservas", JSON.stringify(todas)); } catch {}
    return { ok: true, reservas: todas };
  }
  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, // evita preflight CORS con Apps Script
    body: JSON.stringify(datos)
  });
  return await r.json();
}

/* ---------- render ---------- */
function render() {
  try { localStorage.setItem("cache_reservas", JSON.stringify(reservas)); } catch {}
  const libres = REGALOS.filter((g) => !reservas[g.id]).length;
  $("contador").textContent = libres === 0
    ? "¡Ya están todos reservados!"
    : `${libres} de ${REGALOS.length} regalos disponibles`;

  grid.innerHTML = "";
  for (const g of REGALOS) {
    const tomado = !!reservas[g.id];
    const mio = tomado && !!claves[g.id];
    const li = document.createElement("li");
    li.className = "card" + (tomado ? " card--reservado" : "");
    li.innerHTML = `
      <div class="card__foto">
        <img src="${g.foto || FOTO}" alt="" loading="lazy" width="400" height="300">
        ${tomado ? `<span class="sello">${mio ? "Reservado por vos" : "Reservado"}</span>` : ""}
      </div>
      <div class="card__body">
        <h3 class="card__nombre"></h3>
        <p class="card__desc"></p>
        ${mio
          ? `<button type="button" class="btn btn--ghost" data-id="${g.id}" data-accion="quitar">Quitar reserva</button>`
          : `<button type="button" class="btn" data-id="${g.id}" ${tomado ? "disabled" : ""}>${tomado ? "Reservado" : "Reservar"}</button>`}
      </div>`;
    li.querySelector(".card__nombre").textContent = g.nombre;
    li.querySelector(".card__desc").textContent = g.desc;
    grid.appendChild(li);
  }
}

/* ---------- modal ---------- */
const vistas = { form, ok: $("ok"), quitar: $("quitar") };
function mostrar(v) { for (const k in vistas) vistas[k].hidden = k !== v; }
function setError(msg) { errorEl.textContent = msg; errorEl.hidden = !msg; }
function cerrar() { modal.close(); }

function linkSeguro(url) {
  try { const u = new URL(url); return /^https?:$/.test(u.protocol) ? u : null; } catch { return null; }
}
function mostrarDetalle(g) {
  const u = g.link ? linkSeguro(g.link) : null;
  $("detalle-precio").hidden = !g.precio;
  $("detalle-precio-valor").textContent = g.precio || "";
  $("detalle-link-fila").hidden = !u;
  if (u) { const a = $("detalle-link"); a.href = u.href; a.textContent = u.hostname.replace(/^www\./, "") + " ↗"; }
  $("detalle").hidden = !g.precio && !u;
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (!btn || btn.disabled) return;
  actual = REGALOS.find((g) => g.id === btn.dataset.id);
  if (btn.dataset.accion === "quitar") {
    $("quitar-titulo").textContent = actual.nombre;
    $("quitar-error").hidden = true;
    $("quitar-confirmar").disabled = false; $("quitar-confirmar").textContent = "Sí, quitar reserva";
    mostrar("quitar");
    modal.showModal();
    return;
  }
  $("modal-titulo").textContent = actual.nombre;
  mostrarDetalle(actual);
  form.reset(); setError("");
  confirmar.hidden = false; confirmar.disabled = false; confirmar.textContent = "Confirmar reserva";
  mostrar("form");
  modal.showModal();
  inputNombre.focus();
});

$("cancelar").addEventListener("click", cerrar);
$("quitar-volver").addEventListener("click", cerrar);
$("ok-cerrar").addEventListener("click", cerrar);
modal.addEventListener("click", (e) => { if (e.target === modal) cerrar(); });

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = inputNombre.value.trim().replace(/\s+/g, " ");
  if (nombre.length < 2) { setError("Escribí tu nombre para poder reservar."); inputNombre.focus(); return; }
  setError(""); confirmar.disabled = true; confirmar.textContent = "Reservando…";
  const clave = nuevaClave();
  try {
    const res = await enviar({ accion: "reservar", id: actual.id, regalo: actual.nombre, nombre, clave });
    if (res.reservas) reservas = res.reservas;
    if (res.ok) {
      claves[actual.id] = clave; guardarClaves();
      $("ok-texto").textContent = `${nombre}, te reservamos «${actual.nombre}». ¡Gracias por querer regalarnos algo! Si cambiás de idea, podés quitar la reserva desde esta misma página.`;
      const u = actual.link ? linkSeguro(actual.link) : null;
      $("ok-compra").hidden = !u;
      if (u) $("ok-link").href = u.href;
      mostrar("ok");
    } else {
      setError("Ups, alguien acaba de reservar este regalo. Probá con otro.");
      confirmar.hidden = true;
    }
  } catch {
    setError("No pudimos guardar tu reserva. Revisá tu conexión y probá de nuevo.");
    confirmar.disabled = false; confirmar.textContent = "Confirmar reserva";
    return;
  }
  render();
});

$("quitar-confirmar").addEventListener("click", async () => {
  const b = $("quitar-confirmar"), err = $("quitar-error");
  b.disabled = true; b.textContent = "Quitando…"; err.hidden = true;
  try {
    const res = await enviar({ accion: "cancelar", id: actual.id, clave: claves[actual.id] });
    if (res.reservas) reservas = res.reservas;
    if (res.ok) { delete claves[actual.id]; guardarClaves(); render(); cerrar(); return; }
    err.textContent = "No pudimos quitarla desde este dispositivo. Escribinos y la liberamos.";
  } catch {
    err.textContent = "No pudimos quitar la reserva. Revisá tu conexión y probá de nuevo.";
  }
  err.hidden = false; b.disabled = false; b.textContent = "Sí, quitar reserva";
  render();
});

/* ---------- inicio ---------- */
// Se muestran las tarjetas al instante (con las últimas reservas conocidas) y se actualizan cuando responde la planilla.
try { reservas = JSON.parse(localStorage.getItem("cache_reservas") || "{}"); } catch {}
render();
if (ENDPOINT) grid.setAttribute("aria-busy", "true");
(async () => {
  try {
    reservas = await cargar();
    try { localStorage.setItem("cache_reservas", JSON.stringify(reservas)); } catch {}
  } catch {
    estado.textContent = "No pudimos actualizar las reservas. Recargá la página en un momento.";
    estado.hidden = false;
  }
  grid.removeAttribute("aria-busy");
  render();
})();
