# 7 Publicidade — OS Management

A simple internal system to manage clients and service orders (ordens de serviço) for a print shop, replacing informal/manual tracking with a centralized, secure web app.

## Overview

- **Problem**: Client and order data currently tracked informally, with no access control or history.
- **Solution**: Web app with authentication, role-based permissions, and a full audit trail of service orders.
- **Users**: Admin (shop owner) and Employee, each with different permissions (e.g. only Admin sees pricing).

## Tech Stack

- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS
- **Backend / Database**: Supabase (PostgreSQL + Auth + Row Level Security)
- **Hosting**: Vercel
- **Version Control**: Git + GitHub

## Project Status

🚧 In active development — MVP roadmap in progress.

Current phase: **Fase 5 - auth (setup)**

## Getting Started

```bash
git clone https://github.com/MateusAzedia/7-Publicidade-OS-Management.git
cd 7-Publicidade-OS-Management
npm install
npm run dev
```

Requires a `.env.local` file with Supabase credentials (see `.env.example`).

## Database

SQL migrations live in `/db`, numbered in the order they should be run. See each file for what it creates.

## License

Private project — not for redistribution.

