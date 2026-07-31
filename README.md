# Shoe Cart

A high-end, production-grade React Native application built for a seamless footwear shopping and store management experience. Designed with a clean, minimalist aesthetic inspired by modern high-density dashboards.

<p align="center">
  <img src="docs/Screenshot%202026-07-31%20at%2010.06.28%20PM.png" width="49%" alt="Shoe Cart Screenshot 1" />
  <img src="docs/Screenshot%202026-07-31%20at%2010.06.54%20PM.png" width="49%" alt="Shoe Cart Screenshot 2" />
</p>
---

## Features

### Customer Store

- **Discover & Search:** Instant product filtering by name and brand with a clean search interface.
- **Product Details:** Immersive image display with cover scaling, size selection, and interactive favorite toggling.
- **Cart & Checkout:** Full cart management with real-time subtotal/delivery calculations, quantity controls, and a simulated checkout flow.
- **Order History:** Clean, spacious order cards showing item thumbnails, quantities, sizes, pricing, and live status badges.

### Admin Dashboard

- **Inventory Management (`inventory.tsx`):** View the complete product catalog, track stock, and manage items.
- **Add & Edit Products (`manage.tsx`):** Robust form validation using Zod and React Hook Form to manage brand names, pricing, image URLs, descriptions, and available sizes.
- **Orders Management (`orders.tsx`):** Comprehensive view of customer purchases with interactive status-cycling (Processing $\rightarrow$ Shipped $\rightarrow$ Delivered).
- **Role Switching:** Seamlessly switch between the Customer Store and Admin Portal via the profile/settings tab.

---

## Tech Stack

- **Framework:** React Native with Expo & Expo Router (File-based routing)
- **Language:** TypeScript (Strict typing, zero `any` types)
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`)
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Form Validation:** React Hook Form & Zod
- **Icons:** Lucide React Native
- **Typography:** Inter Font Family (`Inter_400Regular`, `Inter_500Medium`, `Inter_600SemiBold`, `Inter_700Bold`)

---

## Project Architecture

The project follows a clean separation-of-concerns pattern where UI components remain strictly "dumb" (presentation-only) and all business logic, state selectors, and form actions are isolated into custom hooks.

```text
shoe-cart/
├── app/                  # Expo Router file-based screens
│   ├── (admin)/          # Admin portal tabs & screens (orders, inventory, profile, manage)
│   ├── (customer)/       # Customer store tabs & screens (shop, cart, orders, profile)
│   ├── product/          # Product details & checkout screens
│   └── index.tsx         # Root role-selection screen
├── src/
│   ├── components/       # Reusable UI components (ProductCard, etc.)
│   ├── hooks/            # Custom domain hooks (useCart, useProductSearch, useAdminOrders, etc.)
│   ├── store/            # Redux store configuration & slices (cart, orders, products)
│   └── types/            # TypeScript interfaces & definitions
└── assets/               # Images and fonts
```

---

## Getting Started & How to Run

Follow these steps to get the app running locally on your machine:

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v18 or newer recommended)
- npm or yarn
- Expo Go app downloaded on your physical iOS or Android mobile device, or an active iOS Simulator / Android Emulator.

### Step-by-Step Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/shoe-cart.git
cd shoe-cart
```

2. Install project dependencies:

```bash
npm install
```

3. Start the Expo development server:

```bash
npx expo start
```

4. Launch the application:
   - On an iOS Simulator: Press `i` in your terminal window.
   - On an Android Emulator: Press `a` in your terminal window.
   - On a Physical Device: Open the Expo Go camera (iOS) or the in-app QR scanner (Android) to scan the QR code displayed in your terminal.
