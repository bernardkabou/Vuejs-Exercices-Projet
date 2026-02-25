# 🚀 Vue 3 Admin Dashboard

A premium, modern, and highly responsive Admin Dashboard built with **Vue 3 (Vite)**, **Tailwind CSS v4**, and **Chart.js**. This project features a sophisticated UI with glassmorphism effects, interactive analytics, and full product/user management.

## ✨ Features

- **🛡️ Secure Authentication**: Protected routes using Vue Router guards with session persistence via Pinia & LocalStorage.
- **🎨 Premium UI/UX**: 
  - Stunning **Glassmorphism** login page with animated mesh gradients.
  - Responsive Sidebar & Navbar with dynamic **Breadcrumbs**.
  - Modern typography and Lucide iconography.
- **📊 Interactive Analytics**: Real-time sales trends, revenue distribution, and transaction logs powered by **Chart.js**.
- **📦 Product Management**: 
  - Data fetching from Fake Store API.
  - Complete CRUD operations (Add, Edit, Delete).
  - Advanced search, category filtering, and client-side pagination.
- **👥 User Management**:
  - Detailed user directory with search functionality.
  - Interactive profile modals showing contact and location details.

## 🛠️ Technology Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router 4](https://router.vuejs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/) & [vue-chartjs](https://vue-chartjs.org/)
- **Icons**: [Lucide Vue](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd dashboard-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔑 Demo Access

To access the dashboard, use the following demo credentials:

- **Username**: `admin`
- **Password**: `admin`

## 📂 Project Structure

```text
src/
├── assets/         # Global styles & CSS variables
├── components/     # Reusable UI components
│   ├── dashboard/  # Stats cards, charts
│   ├── layout/     # Sidebar, Navbar
│   ├── products/   # Product modals, tables
│   └── users/      # User modals
├── layouts/        # Main application layout wrapper
├── services/       # API interaction layer (Fetch API)
├── stores/         # Pinia stores (Auth, Products, Users)
├── views/          # Page components (Login, Dashboard, Analytics)
└── main.js         # App entry point
```

