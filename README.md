# Terracielo Gastrobar

Sitio web premium para Terracielo Gastrobar, restaurante, cafeteria y gastrobar en Alto Hospicio, Chile.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- Motion for React
- SEO local con metadata, Open Graph, Twitter Cards, robots, sitemap y JSON-LD

## Ejecutar

```powershell
npm.cmd install
npm.cmd run dev
```

Abrir `http://localhost:3000`.

## Verificar

```powershell
npm.cmd run lint
npm.cmd run build
```

## Configuracion editable

La informacion comercial esta centralizada en `src/data/site.ts`:

- enlaces de WhatsApp, Instagram y Fudo
- direccion, horarios y telefono
- platos, cocteles, eventos, promociones, galeria y testimonios
- URL publica usada por metadata, sitemap y JSON-LD

## Mejoras futuras recomendadas

- Reemplazar Unsplash por fotos profesionales reales del local.
- Conectar eventos y promociones a un CMS simple.
- Medir conversiones con Google Analytics, Meta Pixel y eventos de WhatsApp.
- Integrar reservas reales si Fudo o otra plataforma expone API.
- Agregar Google Reviews reales cuando exista acceso a la ficha de negocio.
