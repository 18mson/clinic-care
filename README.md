This project was bootstrapped with Create Next App and includes a typical Next.js folder structure: app, components, lib, public, configuration files, and TypeScript support.

## Getting Started

First, run the development server:

```bash
#install dependencies 
npm install

# then

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder structure 
.
├── app/                     # Pages & layouts (Next.js App Router)
│   ├── layout.tsx
│   ├── page.tsx
│   └── (routes)/            # Grouped routes (optional)
│
├── components/
│   ├── elements/            # Reusable UI components
│   │   ├── button
│   │   ├── input
│   │   └── card
│   │
│   ├── fragments/           # Page-level fragments (composition of elements)
│
├── lib/
│   └── hooks/               # Custom hooks for API calls & data handling
│       ├── useClinics.ts
│       ├── useClinicDetail.ts
│       └── useDoctors.ts
│
├── public/                  # Static assets (images, icons, etc.)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
