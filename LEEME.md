# Bitácora HVAC 4.8 · Bisonte

App para levantamiento y servicio de **minisplits** y otros equipos HVAC en sitio. Se instala en **iPhone y Android** como app (PWA) y **funciona sin internet**.

## Minisplits: control y llenado (pensado para muchos equipos, por ejemplo 24 en oficinas)
- **Un renglón por minisplit:** número, ubicación y estado del día. La unidad interior y la exterior van juntas (AC-05 · CU-05).
  - Estados: **Pendiente** (gris), **En proceso** (ámbar), **Terminado** con hora (verde) y **Falla** (rojo).
  - El ícono de la derecha abre la ficha del equipo.
- **Agrupados por zona o piso**, con avance por zona ("Piso 2 · 6 de 12").
- Arriba, **"X de 24 terminados hoy"** y filtros con contador: Pendientes / En proceso / Terminados / Con falla. También hay buscador y filtro por zona.
- **Vista Lista o Cuadrícula:** la cuadrícula muestra los 24 de un vistazo, con un cuadro de color por equipo.
- Al tocar un minisplit se abre su servicio. Si ya está terminado, se abre su reporte.
- **Agregar minisplits (alta masiva):**
  - indica cuántos (24), zona o piso, marca, capacidad, refrigerante, tipo y ubicación de la unidad exterior;
  - se crean con la misma numeración para interior y exterior (AC-01 + CU-01 … AC-24 + CU-24);
  - las ubicaciones se numeran solas (Oficina 1, Oficina 2…) o puedes escribir cada una.
- **Llenado en ronda:**
  - el formulario indica en qué equipo vas ("Piso 1 · 5 de 24");
  - **Guardar y siguiente** salta al próximo minisplit pendiente;
  - **Copiar del anterior** repite los trabajos realizados y los componentes en buen estado del último equipo guardado hoy, así solo capturas las lecturas.
- Cada minisplit tiene pestañas **Interior / Exterior**. Fecha, técnico y firma se capturan una vez.
- **Administrar unidades:** el ícono de lápiz de cada minisplit (o el botón en la ficha) muestra sus unidades. Desde ahí puedes abrir la ficha de cada una, **Quitar** una unidad interior (sacarla del sistema para dejarla suelta, o eliminarla con su historial), agregar unidades o eliminar el sistema completo.
- **Otro equipo:** multi-split (una exterior con varias interiores), equipo completo (paquete, ventana…) o unidad interior suelta.

## En sitio: lo que pide un técnico de campo (v4.6)
- **Modo Rápido / Completo** (arriba del formulario). *Rápido* deja solo lo esencial del preventivo: temperaturas, CFM directo, voltaje, corriente, succión, gas agregado y prueba de fugas. *Completo* agrega anemómetro, velocidad del ventilador, descarga y temperaturas de tubería. Lo capturado no se pierde al cambiar de modo.
- **Mediciones eléctricas:** solo voltaje (V) y corriente (A).
- **Datos de placa** en cada unidad: marca (con menú), modelo y número de serie. Se guardan en la ficha del equipo y salen en el reporte.
- **Componentes en Bueno por defecto:** solo se cambia el que tenga falla. El contador dice *Todo bien* o *1 con falla*.
- **Código de error:** escribe lo que muestra el display (E1, P4, CH05 o solo 5 en LG) y aparece su significado para Midea / Carrier, Gree y LG. Es referencia general: confirmar con el manual del modelo.
- **Gas agregado y prueba de fugas** (Sin fuga / Con fuga / No se revisó). *Con fuga* marca el sistema como "Requiere atención".
- **Material utilizado:** botones rápidos (capacitor, refrigerante, filtro, cinta, contactor, tarjeta, motor, sensor, bomba, mano de obra) con cantidad y unidad.
- **Correctivo → cotización:** al marcar *Requiere mantenimiento correctivo* se agregan las refacciones necesarias. En la pantalla del cliente aparece *N conceptos por cotizar · Hacer cotización*: capturas precios (se recuerdan), IVA opcional y sale el PDF de cotización con folio.
- **Fotos antes y después:** dos botones directos. En el reporte salen lado a lado.
- **Una sola firma por visita:** el cliente firma una vez al terminar, con *Firma del cliente para la visita de hoy* en la pantalla del cliente. Los formularios de cada sistema ya no piden firma. La firma sale **al final del reporte**, en *Conformidad del servicio*.
- Los campos de texto quedaron en dos: **Qué encontré** y **Qué recomiendo**.

## Ubicación del cliente
En **Nuevo cliente / Editar cliente**, el botón **Usar mi ubicación actual** toma el GPS del teléfono y escribe la dirección sola.
- La dirección se obtiene del servicio gratuito OpenStreetMap / Nominatim, al que se envían las coordenadas.
- Sin internet se guardan solo las coordenadas.
- La ficha del cliente tiene **Abrir en mapas**, y el reporte muestra las coordenadas.
- El navegador pide permiso la primera vez. Solo funciona con la app publicada en **https**.

## Diseño
- Estilo sobrio de aplicación profesional: colores planos, listas tipo sistema operativo, casillas de verificación para los trabajos y controles segmentados. Sin degradados ni emojis.
- Tema **Exterior**, de alto contraste, para trabajar a pleno sol.

## Valores de referencia (lo que el técnico debe esperar)
- Debajo de cada lectura aparece el **rango recomendado** y el campo se pinta verde (correcto), ámbar (revisar) o rojo (fuera de rango) mientras se captura.
- **Presión de gas:** succión y descarga se calculan con la tabla presión-temperatura del refrigerante (R-410A, R-32 y R-22).
  - La succión corresponde a evaporar entre 3 y 8 °C.
  - La descarga corresponde a la temperatura exterior más 8 a 17 °C.
  - Las temperaturas de tubería se calculan a partir de la presión capturada y del sobrecalentamiento/subenfriamiento recomendados.
- Otros rangos:
  - temperatura del aire que sale: 10–15 °C;
  - temperatura del aire que entra: 21–27 °C;
  - diferencia: 8–14 °C;
  - flujo de aire: 350–450 CFM por tonelada;
  - voltaje: nominal ±10 %;
  - consumo del compresor: hasta 80 % del ITM.
- **Ajustes → Valores de referencia** permite editar todos los rangos y consultar la tabla de presiones por refrigerante y temperatura exterior. En el formulario, el botón *Tabla de presiones* muestra la del gas del equipo.
- La **presión de gas** se captura en la pestaña de la unidad exterior. En equipos sin unidad exterior registrada se captura en la misma unidad interior.

## Reporte PDF
Diseño tipo hoja de cálculo: cuadrícula fina, sin rellenos de color; el color va solo en el texto (verde correcto, ámbar revisar, rojo fuera de rango).
- **Hoja 1 · Resumen**:
  - estado general en lenguaje sencillo, hallazgos y recomendaciones;
  - datos del cliente y lista de sistemas atendidos con su resultado;
  - cómo leer el reporte.
- **Una hoja por sistema**, siempre completa:
  - tabla con las unidades lado a lado (interior/es y exterior): marca, modelo, número de serie, capacidad y ubicación, y cada medición contra su rango recomendado;
  - trabajos realizados, componentes con observaciones, notas y hasta 4 fotos (primero las de fallas y las marcadas).
  - Si el contenido no cabe, la hoja se reduce a escala para que el sistema quede en una sola página.
- **Anexo fotográfico** con las demás fotos.
- **Firmas al final de todo el reporte** (técnico y cliente).
- **Cotización** en PDF desde la pantalla del cliente (`../Ejemplo cotizacion HVAC.pdf`).
- Ejemplos de muestra: `../Ejemplo reporte HVAC.pdf` (servicio de un sistema) y `../Ejemplo reporte general HVAC.pdf` (todos los sistemas del cliente).
- También: resumen por WhatsApp y Excel (CSV).

## Google Drive: seguir en otro teléfono
- **Ajustes → Guardar en Drive:** crea el archivo `Bitacora_HVAC_fecha_hora` con todos los datos, fotos y firmas. En el teléfono se abre el menú de compartir: elige **Drive**. En computadora se descarga y lo subes a tu Drive.
- **Ajustes → Abrir desde Drive** en el otro teléfono: eliges el archivo más reciente y luego **Combinar** (junta ambos teléfonos; si un servicio o equipo está en los dos, queda la versión más reciente) o **Reemplazar todo**.
- La pantalla de inicio avisa cuántos cambios no se han guardado en Drive.
- Combinar no borra: lo que elimines en un teléfono no se elimina en el otro.

## Nube (Supabase)
Para guardar todo el detalle, agrega esta columna una sola vez (Supabase → SQL Editor):

```sql
alter table bitacoras add column if not exists extra_json jsonb;
```

## Publicar e instalar
1. Sube esta carpeta a un hosting con **https** (Netlify, Cloudflare Pages o GitHub Pages).
2. **iPhone:** Safari → Compartir → *Agregar a pantalla de inicio*.
3. **Android:** Chrome → menú ⋮ → *Instalar app*.

Para una nueva versión, cambia `APP_VERSION` en `index.html` y `CACHE` en `sw.js` (ej. `bishvac-v4`).
