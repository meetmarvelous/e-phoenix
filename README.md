# E-Phoenix Hotel & Suites

A modern web application for E-Phoenix Hotel & Suites in Ilorin, Kwara State, featuring executive accommodations, fine dining, event halls, photo galleries, virtual tours, and room reservations.

## Features

- **Multi-Branch Support**: Seamless exploration and switching between Main Branch (GRA), Annex 1 (Fate), and Annex 2 (Golf Course Road).
- **Direct Reservations**: Booking inquiries routed through instant WhatsApp integration and direct contact channels.
- **Interactive Modals**: Room details, dining menus, virtual video tours, and high-resolution photo lightboxes.
- **Local SEO & Geo Optimization**: Branch-specific Schema.org JSON-LD structured data and geolocation coordinates.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v9+)

### Installation

```bash
pnpm install
```

### Run Locally

```bash
pnpm dev
```

The application will be accessible at `http://localhost:3000`.

### Build for Production

```bash
pnpm build
```

## Deployment to Vercel

This repository includes a preconfigured `vercel.json` optimized for `pnpm` and Vite SPA routing:

1. Import the repository in [Vercel](https://vercel.com/).
2. Vercel automatically detects `pnpm` and the settings from `vercel.json`.
3. Deploy!
