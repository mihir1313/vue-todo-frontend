# Todo-Frontend

This project is built with Vue 3 and integrates Vue Router for routing, Tailwind CSS for styling, and Vue Toastification for toast notifications.

## Table of Contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Getting Started
Follow the instructions below to set up and run the project locally.

## 📋 Prerequisites
- Node.js (v16.x or later)
- npm (v8.x or later)
- Vue CLI (`npm install -g @vue/cli`)

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mihir1313/vue-todo-frontend.git
   cd vue-todo-frontend
2. **Install dependencies:**
   ```bash
   npm install

   
### Running the Project
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

### Project Structure
```bash
vue-todo-frontend/
├── public/                         # Public assets (favicon, index.html, etc.)
│
├── src/                            # Main source folder for the Vue project
│   ├── assets/                     # Global assets (images, fonts, etc.)
│   │   └── tailwind.css            # Tailwind CSS imports
│   │   └── login.png               # login image
│   │   └── logo.png                # logo
│   │   └── user.jpg                # user image
│   │
│   ├── components/                 # Reusable Vue components
│   │   ├── MainHeader.vue          # Example header component
│   │   ├── MainFooter.vue          # Example footer component
│   │   └── MainLayout.vue          # Main layout component that wraps around pages, includes header and footer
│   │   └── ProcessLoader.vue       # Loader component
│   │   └── HelloWorld.vue          # Default component
│   │ 
│   ├── pages/                     # Reusable Vue components
│   │   ├── LoginPage.vue          # Example header component
│   │   ├── UserDashboard.vue      # Example footer component
│   │   

│   ├── router/                    # Vue Router setup
│   │   └── index.js               # Routes definition
│   │
│   ├── views/                     # Page-level components
│   │   ├── Home.vue               # Home page view
│   │   └── About.vue              # About page view
│   │
│   ├── App.vue                    # Main app component
│   └── main.js                    # Entry file that initializes Vue app
│
├── .gitignore                     # Git ignore file
├── package.json                   # Package dependencies and scripts
├── README.md                      # Project documentation
└── tailwind.config.js             # Tailwind CSS configuration file.


