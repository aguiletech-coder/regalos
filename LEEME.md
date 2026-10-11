# Lista de regalos: cómo conectar la planilla de Google

Con esto, todas las reservas quedan en una hoja de cálculo tuya y todos los invitados ven lo mismo.

1. Entrá a [sheets.google.com](https://sheets.google.com) y creá una hoja nueva (nombre sugerido: "Regalos Camila y Matías").
2. Menú **Extensiones > Apps Script**. Borrá lo que haya y pegá todo el contenido de `apps-script.gs`. Guardá.
3. Botón **Implementar > Nueva implementación**. Tipo: **Aplicación web**.
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
4. Autorizá los permisos que pida Google y copiá la **URL de la aplicación web** (termina en `/exec`).
5. Pegala en `js/regalos.js`, en la primera línea de código: `const ENDPOINT = "https://script.google.com/macros/s/.../exec";`
6. Subí la página de nuevo.

## Qué vas a ver en la hoja
Una pestaña **Reservas** (se crea sola) con: **Invitado**, **Regalo** y **Fecha**. Cada reserva nueva agrega una fila; si un invitado quita su reserva, la fila desaparece.

## Notas
- Cada invitado puede quitar **solo su propia reserva**, desde el mismo dispositivo donde reservó. Si cambió de teléfono o borró los datos del navegador, borrá la fila a mano en la hoja y el regalo queda libre.
- Si cambiás el código del Apps Script, tenés que hacer **Implementar > Administrar implementaciones > editar > Nueva versión** para que se aplique.
- Mientras `ENDPOINT` esté vacío, la página funciona en modo prueba (las reservas quedan solo en tu navegador).
