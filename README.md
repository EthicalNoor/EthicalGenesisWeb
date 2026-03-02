# Ethical Genesis | Enterprise AI Corporate Website

A modern, premium corporate website for Ethical Genesis, an enterprise AI consulting and product engineering firm. Built with **React** and **Vite**, this project features high-performance CSS animations, a responsive cinematic UI, and a fully JSON-driven content architecture.

---

## Technology Stack

* **Framework:** React 18+
* **Build Tool:** Vite
* **Routing:** React Router DOM (`react-router-dom`)
* **Styling:** Vanilla CSS (with modern CSS variables, Grid, Flexbox, and native parallax/animations)
* **Content Management:** Local JSON files (Data-driven architecture)

---

## How to Setup and Run the Project

Follow these steps to run the website on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (Version 16.0 or higher is recommended).

### 1. Open the Terminal
Open your terminal (Command Prompt, PowerShell, or VS Code Terminal) and navigate to the project folder:
```bash
cd E:\Ethical\EthicalGenesisWeb

```

### 2. Install Dependencies

Install all the required packages (like React, React Router, and Vite plugins) by running:

```bash
npm install

```

### 3. Start the Development Server

Run the following command to start the live local server:

```bash
npm run dev

```

*The terminal will output a local URL (usually `http://localhost:5173/`). `CTRL + Click` the link to view the website in your browser. Any changes you make to the code will automatically refresh the page.*

### 4. Build for Production

When you are ready to host the website online (e.g., on Vercel, Netlify, or AWS), run:

```bash
npm run build

```

*This will create a `dist/` folder containing highly optimized, minified static files ready for deployment.*

---

## Folder Structure

The project has been organized into a modular, clean architecture so developers and content writers can work seamlessly.

```text
EthicalGenesisWeb/
├── public/                 # Public static assets (favicon, etc.)
├── src/                    # Main application source code
│   ├── assets/             # Global assets (fonts, icons)
│   ├── data/               # JSON files controlling page text/content
│   │   ├── capabilities.json
│   │   ├── company.json
│   │   ├── connect.json
│   │   ├── intelligence.json
│   │   ├── join.json
│   │   └── solutions.json
│   ├── img/                # Images and Videos
│   │   ├── vid/            # Video backgrounds (cap1.mp4, bv4.mp4, etc.)
│   │   └── logo.png, etc.
│   ├── pages/              # React Components for individual routes
│   │   ├── capabilities.jsx
│   │   ├── company.jsx
│   │   ├── connect.jsx
│   │   ├── intelligence.jsx
│   │   ├── join.jsx
│   │   └── solutions.jsx
│   ├── styles/             # Page-specific CSS files
│   │   ├── capabilities.css
│   │   ├── company.css
│   │   └── ... (matches pages)
│   ├── App.jsx             # Main routing, Navbar, Footer, and Homepage layout
│   ├── App.css             # Global layout & Homepage styling
│   ├── index.css           # CSS Variables (Colors, Fonts) & Global resets
│   └── main.jsx            # React application entry point
├── eslint.config.js        # Linter configuration
├── index.html              # HTML template
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite build configuration

```

---

## How to Update Website Content

The website uses a Data-Driven Architecture. You do not need to touch the React (`.jsx`) files to change the text on the website.

To update text, headings, metrics, or lists, simply edit the corresponding file inside the `src/data/` folder.

* **Want to update open job roles?** Edit `src/data/join.json`
* **Want to change a Solution description?** Edit `src/data/solutions.json`
* **Want to update the Company values?** Edit `src/data/company.json`

The React components will automatically read the updated JSON files and render them using the existing premium styling.

---

## Changing Global Colors & Fonts

All primary theme colors, background colors, and accent colors are controlled globally via CSS variables.
To change the brand colors, open `src/index.css` and update the `:root` variables:

```css
:root {
  --bg-primary: #0b0f19; 
  --bg-secondary: #111827; 
  --text-primary: #ffffff;
  --text-secondary: #9ca3af;
  --accent-color: #3b82f6;  /* Main Brand Blue */
}

```

---

### Official Vite Documentation Reference

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:

* [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses Babel for Fast Refresh
* [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses SWC for Fast Refresh
