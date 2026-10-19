# 📚 Library Management System API

A robust, secure, and production-ready RESTful API built with **Node.js**, **Express**, and **MySQL** (via **Sequelize ORM**). This backend acts as the core administrative and transactional engine for managing book catalogs, tracking lending data, executing automated background reminders, and managing member access lifecycles.

---

## 🔗 Related Repositories
* 🖥️ **Frontend Interface Repository:** [Library Management React CRA Frontend](https://github.com/sajid13673/library_management_system-react-express.git) *(Built with Create React App)*

---

## 🚀 System Modules & Core Features

### 🔐 Multi-Role Authentication
* **Role-Based Access Control (RBAC):** Strict operational isolation between **Admins** and **Users (Members)** to secure specific system boundaries.
* **Security Layer:** State protection backed by **Bcrypt.js** hashing and stateless **JSON Web Tokens (JWT)** mapped via cookies.
* **Activation Gatekeeper:** Blocks login requests instantly with an explicit `403 Forbidden` if a profile is flagged as inactive or pending activation.

### 👥 Member Management
* **Admin Member Provisioning:** Admins can register new users without inputting manual passkeys. The system utilizes a native `crypto` utility to generate secure temporary passwords.
* **Automated Notification Streams:** Integrates a scalable **Nodemailer** layout layer dispatching transactional notifications (`activationPending.js`, `accountActivated.js`, `accountCreatedByAdmin.js`) dynamically upon registration or status toggling.

### 📖 Book Management
* **Catalog Control:** Full CRUD capabilities enabling administrators to manage inventory titles, authors, categories, and stock quantities.
* **Media Processing:** Powered by **Multer** to cleanly process file metadata uploads and compress high-resolution book cover assets into static folders.

### 🔄 Borrowings Management
* **Circulation Tracking:** Orchestrates a reliable lending lifecycle tracking checkout distributions, scheduled return dates, and live item counts.
* **Availability Thresholds:** Restricts checkouts instantly if the inventory stock levels drop to zero or if the target member profile hits a borrowing limit.

### 💰 Fine Management & Automation
* **Automated Penalty Pipelines:** Driven by **Node-Cron** background schedules to inspect return parameters nightly, evaluate late turn-ins, and apply monetary penalties automatically.
* **Status Updates:** Flags outstanding profiles to lock user borrowing permissions until administrative fine resolutions are settled.

---

## 🛠️ Technology Stack & System Core
* **Runtime Environment:** Node.js (v18+ recommended)
* **Framework:** Express.js (v4.21.2)
* **Database Driver:** MySQL2 (v3.12.0)
* **Object-Relational Mapping (ORM):** Sequelize (v6.37.5) with Sequelize-CLI 
* **Input Scoping Rules:** Express-Validator (v7.2.0) 

---

## 📂 Backend Structural Mapping

```text
├── config/
│   ├── database.js          # Sequelize connection settings
│   └── mail.js              # Centralized SMTP mail transport instance
├── migrations/              # Database schema migrations versions scripts
├── models/                  # Core Sequelize database entity schemas
├── services/
│   └── mail/
│       ├── templates/       # Pure, cross-client HTML transactional layouts
│       └── mailService.js   # Unified email dispatcher modules interface
├── utils/
│   └── passwordGenerator.js # Secure crypto temporary string utility
├── app.js                   # Application server setup 
├── index.js                 # Entrypoint runtime orchestrator
└── .env.example             # Template schema environment parameters configuration
```

---

## 📥 Getting Started

### 1. Prerequisite Installations
Ensure your development computer runs **Node.js** and an accessible instance of **MySQL Server**.

### 2. Clone and Setup Dependencies
```bash
git clone https://github.com/sajid13673/libary_management_system-express.git
cd libary_management_system-express
npm install
```

### 3. Configure Environmental Variables
Create an absolute `.env` parameters file in your application root directory:
```bash
cp .env.example .env
```
Populate the values inside `.env` using your environment template settings:
```env
DATABASE_URL=mysql://user:xxxxxxxxx@localhost:3306/db_name
JWT_SECRET=xxxxxxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:3000
PORT=5001

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_library_email@gmail.com
SMTP_PASS=xxxx_xxxx_xxxx_xxxx
MAIL_FROM_ADDRESS=example@mail.com
```

### 4. Initialize Database Tables and Migrations
Execute the migrations sequence through the Sequelize CLI binary helper to build your tables cleanly:
```bash
npx sequelize-cli db:migrate
```

### 5. Launch the Application Engine
Run the localized developer watcher to boot up the Node instance over the configured port layout:
```bash
npm start
```
The server will now be live on `http://localhost:5001` and monitoring requests.

---

## 🧭 Core API Endpoint Matrix

| Method | Endpoint | Access Role | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Public | Registers a new member account (Defaults to inactive) |
| **POST** | `/api/auth/login` | Public | Authenticates credentials and delivers token cookies |
| **POST** | `/api/admin/members` | Admin Only | Generates user profiles with auto-generated passwords |
| **PATCH**| `/api/admin/members/:id/toggle` | Admin Only | Switches profile access states between active and inactive |
| **POST** | `/api/books` | Admin Only | Adds a new book option and processes media attachments |
| **GET**  | `/api/books` | Admin / Member| Fetches and searches available library assets |
| **POST** | `/api/borrowings/checkout` | Admin Only | Registers a borrowing operation for a user |
| **POST** | `/api/borrowings/return/:id` | Admin Only | Processes returned assets and drops active hold records |
| **GET**  | `/api/fines/member/:id` | Admin / Member| Retrieves outstanding financial penalties of a member |

---

## 🧪 Available Scripts
* `npm start` - Bootstraps the application via `nodemon` for instant workspace file change refreshing.
* `npx sequelize-cli db:migrate` - Pushes structural migrations definitions into the current active MySQL target database.
* `npx sequelize-cli db:migrate:undo` - Rolls back the most recent individual database schema adaptation safely.

---

## 📄 License
This application setup is initialized under the **ISC License**.
