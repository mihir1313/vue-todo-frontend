# Codework-Frontend

This project is built with Vue 3 and integrates Vue Router for routing, Tailwind CSS for styling, and Vue Toastification for toast notifications.

## Table of Contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Customize Configuration](#customize-configuration)
- [License](#license)

## Getting Started
Follow the instructions below to set up and run the project locally.

## 📋 Prerequisites
- Node.js (v16.x or later)
- npm (v8.x or later)
- Vue CLI (`npm install -g @vue/cli`)

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mihir1313/codework-frontend.git
   cd codework-frontend
2. **Install dependencies:**
   ```bash
   npm install

## Project Structure

codework-frontend/
├── public/                 # Public assets
├── src/
│   ├── assets/             # Assets (CSS, images, etc.)
│   ├── components/         # Reusable Vue components
│   ├── router/             # Vue Router setup
│   ├── views/              # Page components
│   ├── App.vue             # Main app component
│   ├── main.js             # Entry file
│   └── assets/tailwind.css # Tailwind CSS imports
├── .gitignore
├── package.json
├── README.md
└── tailwind.config.js

## Running the Project
1. **Start the development server:**
   ```bash
    npm run serve

## Usage
1. **Vue Router:**
   ```bash
   This project uses Vue Router for managing the application's page navigation. You can define new routes in src/router/index.js.
2. **Tailwind CSS:**
   ```bash
   Tailwind CSS is used for utility-first styling. You can customize it by editing tailwind.config.js.
3. **Vue Toastification:**
   ```bash
    For toast notifications, this project uses Vue Toastification, configured in main.js.
