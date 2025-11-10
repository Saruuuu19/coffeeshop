# ☕ CoffeeCo. Landing Page

A modern, high-performance landing page for a specialty coffee shop built with **Astro** and **Tailwind CSS**. This project focuses on fast loading times and an excellent user experience by leveraging Static Site Generation (SSG).

---

## ✨ Key Features

This project utilizes advanced web development techniques to ensure speed and efficiency:

* **Extreme Performance (Astro):** The site is delivered as **zero-JavaScript** static HTML by default, resulting in near-instantaneous load times.
* **Component Islands:** Uses **Preact** for isolated interactivity (the Mobile Hamburger Menu), ensuring that interactivity is only loaded where absolutely necessary.
* **Modern, Responsive Design:** Styled using **Tailwind CSS** for a clean, elegant, and mobile-first user interface.
* **Static Data Generation:** The menu and other dynamic content are built at compile-time by iterating over a local data source (`menu.js`), making the site fast and robust.
* **Sticky Footer:** Implemented using modern Flexbox (`flex-grow` in the `<main>` container) to ensure the footer always stays at the bottom of the viewport.

---

## 🚀 Installation and Local Usage

Follow these steps to get the project running on your local machine.

### Prerequisites

You must have [Node.js](https://nodejs.js.org/) installed.

### 1. Clone the Repository

```bash
git clone [YOUR_REPOSITORY_URL]
cd your-project-name
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Start the development server
```bash
pnpm run dev
```


