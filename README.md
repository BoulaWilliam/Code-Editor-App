

# **Code Editor App**

Welcome to the **Code Editor App** — a feature-rich, responsive, and modern online code editor built as part of a graduation project.
This application allows users to create, edit, and manage code files directly in the browser with real-time feedback, syntax highlighting, file sharing, and much more.

🏆 This project was awarded an **A Grade** and showcases advanced frontend architecture, seamless API integration, and thoughtful user experience design.

<br>

## **🌟 Features and Functionalities**

<ul>
  <li><strong>Authentication:</strong> User registration, login, and token-based authentication with protected routes.</li>
  <li><strong>Code Editing:</strong> Real-time code editor with syntax highlighting, autocompletion, and language selection powered by <code>Monaco Editor</code>.</li>
  <li><strong>File Management:</strong> Create, update, delete, read, and share code files with private or public access.</li>
  <li><strong>Responsive Design:</strong> Fully responsive and optimized for desktop and mobile users.</li>
  <li><strong>Animated UI:</strong> Smooth page transitions and animations using <code>Framer Motion</code>.</li>
  <li><strong>Toast Notifications:</strong> User-friendly notifications for actions and error handling via <code>react-hot-toast</code>.</li>
</ul>

<br>

## **🛠 Technologies Used**

<ul>
  <li><strong>React.js</strong> – Functional components and hooks</li>
  <li><strong>Tailwind CSS</strong> – Utility-first styling with dark mode support</li>
  <li><strong>Monaco Editor</strong> – Powerful browser-based code editor</li>
  <li><strong>Chakra UI</strong> – Accessible and modular UI components</li>
  <li><strong>Framer Motion</strong> – Page and component animations</li>
  <li><strong>Axios</strong> – API communication</li>
  <li><strong>Font Awesome</strong> – Icon library</li>
</ul>

<br>

## **📡 API Integration**

This app connects to a backend API for user authentication and file operations.

```
https://gradapi.duckdns.org/
```

Authenticated requests are handled using `Bearer` tokens managed by context and localStorage.

<br>

## **🧾 File Operations Supported**

Once a file is created:

* **Read All Files**
* **Read Shared File**
* **Read Single File**
* **Update File**
* **Delete File**
* **Share File**

These operations are available after successful creation using the appropriate `fileId`.

<br>

## **📂 Folder Structure Highlights**

```
src/
│
├── components/         // Modular UI Components (Editor, Sidebar, Navbar, etc.)
├── pages/              // Main pages like Home, Login, Register
├── context/            // AuthContext for user/token management
├── routes/             // Protected and public routes
├── utils/              // Helper functions and API logic
└── App.jsx             // App initialization and route config
```

<br>

## **🚀 Getting Started**

### Clone the Repository

```bash
git clone https://github.com/BoulaWilliam/Code-Editor-App.git
```

### Navigate & Install Dependencies

```bash
cd Code-Editor-App
npm install
```

### Start the Development Server

```bash
npm run dev
```

<br>



## **📚 License**

This project is licensed for academic and educational purposes.


