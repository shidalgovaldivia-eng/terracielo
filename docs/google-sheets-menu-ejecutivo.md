# Menu Ejecutivo del Dia con Google Sheets

Esta integracion permite que el restaurante actualice el menu diario desde una planilla privada de Google Sheets. La web consulta la planilla desde una API Route server-side y nunca expone credenciales en el navegador.

## Modo demo seguro

Mientras no existan credenciales reales, `/api/menu-del-dia` responde con un menu demo local desde:

```txt
src/data/menu-demo.ts
```

El demo usa automaticamente la fecha actual de Chile y devuelve:

```txt
entrada: Ensalada fresca
fondo: Pollo grillado
acompanamiento: Arroz primavera
bebida: Bebida o jugo natural
postre: Postre del día
precio: $7.990
disponible: SI
source: demo
```

Esto permite que la seccion se vea funcionando en produccion sin subir credenciales falsas ni hacer publica la planilla.

La etiqueta visual `Modo demo` solo se muestra en desarrollo local. En produccion no se muestra, aunque la API indique `source: "demo"`.

## Estructura de la planilla

La primera fila debe tener estos encabezados exactos:

```txt
fecha | entrada | fondo | acompanamiento | bebida | postre | precio | disponible
```

Formato recomendado para `fecha`:

```txt
YYYY-MM-DD
```

Ejemplo:

```txt
2026-06-20 | Ensalada chilena | Pollo grillado | Arroz primavera | Jugo natural | Flan casero | $8.900 | SI
```

Reglas:

- `disponible` debe ser `SI` para mostrarse en la web.
- Si `disponible` es `NO`, esta vacio o no existe una fila para la fecha actual de Chile, la web muestra: `Consulta el menu ejecutivo de hoy por WhatsApp`.
- La API tambien acepta fechas tipo `20/06/2026` o `20-06-2026`, pero `YYYY-MM-DD` evita ambiguedades.

## Crear la Service Account

1. Entrar a Google Cloud Console.
2. Crear o seleccionar un proyecto.
3. Activar la API `Google Sheets API`.
4. Ir a `IAM y administracion` -> `Cuentas de servicio`.
5. Crear una cuenta de servicio, por ejemplo `terracielo-menu`.
6. Crear una clave JSON para esa cuenta.
7. Del JSON copiar:
   - `client_email`
   - `private_key`

No subas el JSON al repositorio.

## Compartir la planilla

1. Abrir la planilla de Google Sheets.
2. Click en `Compartir`.
3. Agregar el email de la Service Account, por ejemplo:

```txt
terracielo-menu@tu-proyecto.iam.gserviceaccount.com
```

4. Dar permiso de `Lector`.
5. Copiar el ID de la planilla desde la URL:

```txt
https://docs.google.com/spreadsheets/d/GOOGLE_SHEET_ID/edit
```

## Configurar variables en Vercel

En el proyecto `terracielo` de Vercel, agregar:

```txt
GOOGLE_SERVICE_ACCOUNT_EMAIL=terracielo-menu@tu-proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=id_de_la_planilla
```

Notas:

- `GOOGLE_PRIVATE_KEY` puede pegarse con saltos de linea reales o con `\n`; el codigo soporta ambos formatos.
- No agregar estas variables en codigo fuente.
- Despues de configurar variables, redeployar el proyecto.

## Reemplazar demo por Google Sheets real

El modo demo se desactiva automaticamente cuando las tres variables existen en Vercel:

```txt
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
GOOGLE_SHEET_ID
```

No hay que cambiar codigo. Despues de configurar las variables y redeployar:

- Si Google Sheets responde y hay menu disponible para la fecha actual, la API devuelve `source: "google_sheets"`.
- Si Google Sheets responde pero no hay fila disponible para hoy, devuelve `source: "fallback"`.
- Si faltan variables, devuelve `source: "demo"`.

Para desactivar el modo demo definitivamente, mantener siempre configuradas esas tres variables en todos los entornos donde se quiera leer la planilla real.

## Como funciona en la web

Flujo:

```txt
Google Sheets privado
  -> /api/menu-del-dia
  -> MenuEjecutivoDelDia
  -> Sitio Web
```

Archivos principales:

- `src/app/api/menu-del-dia/route.ts`: API Route server-side.
- `src/lib/google-sheets-menu.ts`: autenticacion con Service Account y lectura de Sheets.
- `src/lib/menu-del-dia.ts`: fecha Chile, normalizacion de filas y seleccion del menu.
- `src/components/sections/menu-ejecutivo-del-dia.tsx`: componente visual.

## Revalidacion

La API usa cache HTTP:

```txt
Cache-Control: public, s-maxage=300, stale-while-revalidate=60
```

Esto permite revalidar automaticamente cada 5 minutos.

## Agregar nuevos menus

1. Crear una nueva fila en la planilla.
2. Usar la fecha del dia correspondiente.
3. Completar entrada, fondo, acompanamiento, bebida, postre y precio.
4. Escribir `SI` en `disponible`.
5. Si hay dos filas con la misma fecha y ambas estan disponibles, la web muestra la primera disponible.
