# Advanced Task Manager 🚀

A high-performance, production-ready Kanban-style task management engine. This web application delivers a seamless project management workflow with a completely safe, strict type-validated environment, next-gen tooling, and a robust cloud database layer.

---

## ✨ Key Features

- **Identity Management:** Secure login, user registration, and dynamic session token survival powered by **Firebase Authentication**.
- **Dynamic Board Architecture:** Complete end-to-end CRUD operations over nested workspaces (**Boards -> Columns -> Tasks**).
- **Interactive Drag-and-Drop:** Native, accessible, and fluid task card layout shifting using the **@dnd-kit Engine**.
- **Declarative Form Processing:** Enterprise-grade input management matching **React Hook Form** state containers with **Joi Schema** validation pipelines.
- **Persistent Cache Orchestration:** Asynchronous backend synchronization, query retry policies, and optimistic UI transitions driven by **TanStack Query v5**.
- **XSS Mitigation Armor:** Automated HTML content body sanitization preventing raw script injection vectors inside user rich-text fields with **DOMPurify**.

---

## 🛠️ System Architecture & Tooling

The codebase targets highly modernized tech-stack specifications:

- **Core Render Framework:** React 19 + TypeScript (Strict Mode)
- **Next-Gen Bundle System:** Vite 8 + Native **Oxc Engine** (Rust-powered compilation)
- **User Interface Engine:** Material UI v9 (MUI) combined with Emotion styling definitions
- **Database Layer:** Cloud Firebase 12 Realtime Services (Firestore)
- **Code Maintenance Loop:** ESLint v10, Prettier, Husky pre-commit hooks & lint-staged

---

## 📦 Getting Started & Self-Hosting

Follow these steps to configure your own Firebase instance and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/ruorc/adv-task-manager.git
cd adv-task-manager
npm install
```

### 2. Configure Firebase Projects

1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add Project**.
2. Enable **Authentication** in the build menu and turn on the **Email/Password** provider.
3. Create a **Cloud Firestore** database. Select your preferred database location and start in **Production Mode**.

### 3. Apply Firebase Security Rules

Database security rules are isolated into standalone file containers to maintain clean architectural boundaries and prevent unauthorized mutations:

- **Firestore Rules:** Located at [`/firestore.rules`](./firestore.rules).
- **Configuration Manifest:** Located at [`/firebase.json`](./firebase.json).

#### Option A: Automated Deployment (Recommended)

If you have the [Firebase CLI](https://console.firebase.google.com/) installed, simply log in and deploy the production-ready rulesets automatically with a single command:

```bash
firebase login
firebase deploy --only firestore:rules
```

#### Option B: Manual Setup

If you prefer configuring via the web dashboard:

1. Open the [Firebase Console](https://console.firebase.google.com/) and navigate to your project.
2. Select **Firestore Database** from the build grid and enter the **Rules** tab.
3. Copy the entire contents of the local [`firestore.rules`](./firestore.rules) file, paste it into the online text canvas, and press **Publish**.

### 4. Setup Local Environment Variables

Create a `.env` configuration file in the project workspace root and paste your Firebase Web App configuration credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

---

## 💻 Native Commands Pipeline

Use the following scripts during local development and compilation:

- **Execution Development Sandbox:** `npm run dev`
- **Strict Production Compilation Build:** `npm run build`
- **Static Quality Evaluation Engine (Linting):** `npm run lint`
- **Local Distribution Pipeline Preview:** `npm run preview`

---

## 📄 License

This application is open-source software licensed under the MIT specifications.
