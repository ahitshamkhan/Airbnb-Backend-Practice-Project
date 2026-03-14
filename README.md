# 🏠 Airbnb Backend Practice Project

A backend practice project inspired by Airbnb, built with **Node.js** and **Express.js** as part of a backend learning journey. The project demonstrates server-side routing, static file serving, form handling, and basic MVC structure.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 About the Project

This project is a simplified Airbnb-inspired backend built to practice core backend development concepts including:

- Setting up an Express.js server
- Organising routes using Express Router
- Serving static HTML views
- Handling HTML form submissions (URL-encoded data)
- Serving static assets (CSS)
- Custom 404 error handling

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express.js](https://expressjs.com/) v5 | Web framework |
| [Tailwind CSS](https://tailwindcss.com/) v4 | Utility-first CSS styling |
| [nodemon](https://nodemon.io/) | Development auto-reload |
| [PostCSS](https://postcss.org/) | CSS processing |
| [Autoprefixer](https://github.com/postcss/autoprefixer) | CSS vendor prefixes |

---

## ✨ Features

- **Home Page** – Displays a listing of available homes.
- **Add Home (Host Flow)** – Hosts can submit a new home listing via an HTML form.
- **Home Added Confirmation** – Confirmation page shown after a successful listing submission.
- **Custom 404 Page** – A user-friendly page for unknown routes.
- **Static Asset Serving** – CSS and public assets served via Express static middleware.

---

## 📁 Project Structure

```
Airbnb-Backend-Practice-Project/
├── README.md
└── airbab/
    ├── app.js                  # Entry point – configures Express app and middleware
    ├── package.json            # Project metadata and dependencies
    ├── package-lock.json       # Dependency lock file
    ├── public/
    │   └── home.css            # Global stylesheet (compiled Tailwind CSS)
    ├── routes/
    │   ├── userRouter.js       # User-facing routes (home page)
    │   └── host.js             # Host routes (add / submit listing)
    ├── utlits/
    │   └── pathutlits.js       # Utility: resolves the root directory path
    └── views/
        ├── home.html           # Home / listings page
        ├── addhome.html        # Add new home listing form
        ├── homeadded.html      # Listing added confirmation page
        └── 404.html            # Custom 404 error page
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ahitshamkhan/Airbnb-Backend-Practice-Project.git
   cd Airbnb-Backend-Practice-Project/airbab
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the App

**Development mode** (with auto-reload via nodemon):

```bash
npm start
```

The server will start at:

```
http://localhost:3000
```

---

## 🗺 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/` | Renders the home / listings page |
| `GET` | `/host/add-home` | Renders the add new home form |
| `POST` | `/host/add-home` | Handles form submission for a new home listing |
| `*` | Any unknown route | Returns the custom 404 page |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [ISC License](https://opensource.org/licenses/ISC).

---

> Built with ❤️ as part of a backend learning journey.

