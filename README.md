# Dentist Appointment Management System - Frontend

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/X7QuxRjS)

A modern, high-performance web application built with **Next.js 15** for managing dentist appointments. It provides a seamless user experience for booking, viewing, and managing dental visits.

## ✨ Features

- **Dynamic Booking System**: Interactive interface for selecting dentists and scheduling appointments.
- **State Management**: Robust state handling using **Redux Toolkit** and persistent storage with Redux Persist.
- **Secure Authentication**: Integrated with **Next-Auth** for secure login, registration, and session management.
- **Responsive Design**: Mobile-first approach using **Tailwind CSS** and **Material UI (MUI)** components.
- **Server-Side Rendering (SSR)**: Optimized performance and SEO using Next.js App Router features.
- **Type Safety**: Fully implemented with **TypeScript** for better developer experience and reliability.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **State Management**: Redux Toolkit & React Redux
- **Authentication**: Next-Auth
- **Styling**: Tailwind CSS & Material UI (MUI)
- **Date Handling**: Day.js
- **API Communication**: Native Fetch API with custom auth wrappers

## 📂 Project Structure

```text
├── src/
│   ├── app/            # Next.js App Router (Pages & Layouts)
│   ├── components/     # Reusable UI components
│   ├── libs/           # API utilities and Auth helpers
│   ├── redux/          # Redux slices and store configuration
│   ├── providers/      # Context providers (Auth, Redux, MUI)
│   └── interface.ts    # TypeScript definitions
```

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+ 
- Backend API running (see [Backend README](../dentist-backend/README.md))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Brightpmk/dentist-booking-webapp.git
   cd fe-project-68-chawiss
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/v1
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Deployment

The application is optimized for deployment on **Vercel**.

- Live Demo (Frontend): [https://dentaire-five.vercel.app/](https://dentaire-five.vercel.app/)
- Backend API: [https://dentist-backend-two.vercel.app/api/v1](https://dentist-backend-two.vercel.app/api/v1)

## 📄 License
Private Project - All Rights Reserved.
