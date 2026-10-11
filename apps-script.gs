// Google Apps Script para la lista de regalos de Camila y Matías.
// Pasos en LEEME.md. La hoja "Reservas" se crea sola con estas columnas:
//   A Invitado | B Regalo | C Fecha | D id (interno) | E clave (interna)
// La columna E nunca se envía a la página: sirve para que cada invitado pueda quitar SOLO su propia reserva.
// Si querés liberar un regalo a mano, borrá la fila en la hoja.

function hoja_() {
  const ss = SpreadsheetApp.getActive();
  let h = ss.getSheetByName("Reservas");
  if (!h) {
    h = ss.insertSheet("Reservas");
    h.appendRow(["Invitado", "Regalo", "Fecha", "id", "clave"]);
    h.getRange("A1:E1").setFontWeight("bold");
    h.setFrozenRows(1);
    h.hideColumns(4, 2); // oculta id y clave
  }
  return h;
}

function mapa_(h) {
  const reservas = {};
  h.getDataRange().getValues().slice(1).forEach(f => { if (f[3]) reservas[f[3]] = f[0]; });
  return reservas;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return json_({ reservas: mapa_(hoja_()) });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const h = hoja_();
    const filas = h.getDataRange().getValues();
    const idx = filas.findIndex((f, i) => i > 0 && f[3] === d.id);

    if (d.accion === "cancelar") {
      if (idx > 0 && filas[idx][4] === d.clave) h.deleteRow(idx + 1);
      else if (idx > 0) return json_({ ok: false, error: "no_autorizado", reservas: mapa_(h) });
      return json_({ ok: true, reservas: mapa_(h) });
    }

    if (idx > 0) return json_({ ok: false, ocupado: true, reservas: mapa_(h) });
    const nombre = String(d.nombre || "").trim().slice(0, 60);
    if (nombre.length < 2) return json_({ ok: false, error: "nombre", reservas: mapa_(h) });
    h.appendRow([nombre, String(d.regalo || d.id).slice(0, 80), new Date(), d.id, String(d.clave || "")]);
    return json_({ ok: true, reservas: mapa_(h) });
  } finally {
    lock.releaseLock();
  }
}
