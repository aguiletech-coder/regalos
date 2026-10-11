/* Lista de regalos — Camila y Matías
   Si ENDPOINT está vacío, las reservas se guardan solo en este navegador (modo prueba).
   Para que todos los invitados vean las mismas reservas, pegá acá la URL del Apps Script (ver LEEME.md). */
const ENDPOINT = "https://script.google.com/macros/s/AKfycbwAmG11c0MSOYxdpkSftZDHA6s_A4-MXUHE6xi3Q2JLupdUHg5yAwr21BXjO_3ZFvUv/exec";

const REGALOS = [
  { id: "licuadora",  nombre: "Licuadora",        desc: "Para los licuados del desayuno y las sopas de invierno.", foto:"img/licuadora.png"},
  { id: "Tostadora",    nombre: "Tostadora", desc: "Para disfrutar de desayunos y meriendas con tostadas calentitas y crocantes." , foto:"img/tostadora.png"},
  { id: "ollas",      nombre: "Set de ollas",     desc: "Para estrenar la cocina de casados con muchas comidas ricas.", foto:"img/ollas.png" },
  { id: "cafetera",   nombre: "Cafetera",         desc: "Porque los domingos arrancan mejor con un buen café." , foto:"img/cafetera.png"},
  { id: "Tabla para picar",    nombre: "Tabla para picar",   desc: "Tabla para picar de acero inoxidable.", foto:"img/tablaacero.png" },
  { id: "aspiradora", nombre: "Aspiradora", desc: "Que la casa quede impecable mientras disfrutamos." , foto:"img/aspiradora.png"},
  { id: "Especieros",      nombre: "Especieros", desc: "Para tener nuestras especias siempre ordenadas y darle ese toque especial a cada comida.", foto:"img/especieros.png" },
  { id: "Tuppers hermeticos",      nombre: "Tuppers hermeticos",   desc: "Para guardar, organizar y conservar nuestras comidas de todos los días." ,foto:"img/tuppers.png" },
  { id: "minipimer",     nombre: "minipimer", desc: "ara preparar salsas, cremas y muchas recetas de forma rápida y práctica." , foto:"img/minipimer.png"},
  { id: "Utensillos de silicona",  nombre: "Utensillos de silicona",        desc: "Para cocinar con comodidad y tener todo lo necesario a mano para nuestras recetas." , foto:"img/silicona.png"},
  { id: "Yogurtera",    nombre: "Yogurtera", desc: "Para preparar yogures caseros, ricos y saludables, disfrutando de algo hecho en casa." , foto:"img/yogurt.png"},
  { id: "pava",       nombre: "Pava eléctrica",   desc: "Agua caliente al instante para el mate de cada tarde." , foto:"img/pava.png"}
];
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
