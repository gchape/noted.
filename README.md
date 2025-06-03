# Project: Noted.

## 👥 Team Information
- **Team Members**: Giorgi Chapidze

## 🎯 Project Vision
**Problem Statement**: People often capture thoughts, links, or todos across multiple apps and lose track. Noted. offers a minimalist and accessible place to store and organize notes.

**Target Users**: Students, developers, writers — anyone needing a fast, lightweight, distraction-free notes interface.

**Value Proposition**: Cross-platform accessibility, markdown support, and a clean UX with fast performance.

## 🏗️ Architecture & Technical Design

### Tech Stack
- **Frontend**: React + TypeScript
  - **Routing**: React Router
  - **Data Fetching & Caching**: React Query
- **Backend**: Node.js + TypeScript
- **Database**: MongoDB
- **Deployment**: AWS EC2
- **Testing**: Jest

### System Architecture
- **Component Hierarchy**:
  - <App>
  ├── <Navbar />
  ├── <Routes>
  │     ├── <NoteList />         // shows list of all notes
  │     ├── <NoteDetail />       // displays a single note by ID
  │     ├── <AddNoteForm />      // form to add a new note
  │     └── <EditNoteForm />     // form to edit an existing note
  └── <AuthProvider>             // provides user auth context

- **API Design**:
  - GET /api/notes
    - **Description**: Fetch all notes for the authenticated user
  - POST /api/notes
    - **Description**: Create a new note
  - GET /api/notes/:id
    - **Description**: Fetch a single note by ID
  - PUT /api/notes/:id
    - **Description**: Update an existing note
  - DELETE /api/notes/:id
    - **Description**: Delete a note
- **Database Schema**:
  Note {
    _id: ObjectId
    userId: ObjectId
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
  }

  User {
    _id: ObjectId
    email: string
    passwordHash: string
    createdAt: Date
  }

- **Authentication**:
  - **Method**: JSON Web Tokens (JWT)
  - **Login**: On login, the server issues a signed JWT
  - **Storage**: JWT stored in HTTP-only cookie
  - **Middleware**: Express middleware checks JWT for protected routes

Here’s a suggested and filled-in version for your remaining sections:

---

### 🔑 Key Design Decisions

* **React with TypeScript**: Ensures type safety and improved DX on the frontend.
* **React Query**: Handles data fetching, caching, and background sync, minimizing boilerplate.
* **MongoDB**: Flexible schema suited for unstructured notes and quick prototyping.
* **JWT Authentication with HTTP-only cookies**: Balances security and usability for session management.
* **Modular API with Express**: Easy to extend and maintain individual route responsibilities.

---

## 🧪 Test-Driven Development Strategy

* **Core Features to Test**:

  * Note CRUD operations (API and UI)
  * Authentication logic
  * Error handling (e.g., 404 for nonexistent notes)
  * Form validation and input sanitization

* **Testing Approach**:

  * **Unit Tests**: For utility functions, API controllers (Jest)
  * **Integration Tests**: End-to-end API route tests (Supertest + Jest)
  * **Frontend Tests**: Component testing (React Testing Library), with mocked API calls

* **Test Coverage Goals**:

  * Aim for **80%+** code coverage across backend
  * Cover all **critical UI flows** (create/edit/delete note, auth)

---

## 📦 Feature Breakdown

### ✅ **Week 1: Notes UI**

1. [ ] Create `NoteList` component to fetch and display user’s notes
2. [ ] Create reusable `NoteCard` or list item UI for each note
3. [ ] Create `NoteDetail` component to show a single note by ID
4. [ ] Add loading and error states to queries (React Query)
5. [ ] Add route structure for `/notes`, `/notes/:id`

---

### ✅ **Week 2: Auth Integration**

1. [ ] Connect login form to backend via React Query mutation
2. [ ] Connect register form to backend via mutation
3. [ ] Handle JWT via HTTP-only cookie (test with `withCredentials`)
4. [ ] Add protected routes logic based on user auth state
5. [ ] Implement logout flow and clear user context

---

### ✅ **Week 3: Authentication UI**

1. [ ] Set up basic React project structure with routes (`react-router`)
2. [ ] Create `Login` form component with input validation
3. [ ] Create `Register` form component with input validation
4. [ ] Build `AuthProvider` using React Context to manage user state
5. [ ] Add navigation bar with login/logout/register links

---

### ✅ **Week 4: Create/Edit Note UI**

1. [ ] Build `AddNoteForm` component with title/content fields
2. [ ] Hook up `AddNoteForm` to backend with mutation
3. [ ] Build `EditNoteForm` component prefilled with note data
4. [ ] Hook up `EditNoteForm` to backend mutation
5. [ ] Add cancel/back navigation between forms and views

---

### ✅ **Week 5: Polish & Mobile Responsiveness**

1. [ ] Make all views mobile-responsive with CSS media queries or Tailwind
2. [ ] Add global UI feedback: toasts, modals, or banners for success/errors
3. [ ] Validate input on all note forms (e.g., title required)
4. [ ] Add confirm delete dialog for notes
5. [ ] Apply basic theming: color palette, spacing, consistent typography

---

## 🚀 Deployment Strategy

* **AWS Services**:

  * **EC2**: Hosts Node backend and React frontend

* **Environment Variables**:

  * Use `.env` files (with `dotenv`)

* **Database Hosting**:

  * Use MongoDB

* **Domain & SSL**:

  * Free SSL via Let's Encrypt or ACM + NGINX reverse proxy
---

## 🤔 Potential Challenges & Solutions

* **Challenge 1**: Sync issues or stale data in UI

  * *Solution*: Use `react-query`'s invalidation and background re-fetch

* **Challenge 2**: Managing authentication securely in the browser

  * *Solution*: Use HTTP-only cookies for JWT storage and server-side session validation

---

## 📈 Success Metrics

* **Functionality**: All CRUD and auth flows work end-to-end
* **Code Quality**: Type-safe codebase with ESLint and `tsconfig` strict rules
* **Performance**: Sub-second load time for main dashboard
* **User Experience**: Intuitive UI, mobile-friendly, no major UI bugs

---

## 🎯 Grading Criteria (450 points total)
1. **Code Quality & Architecture** (120 pts - 27%)
2. **Testing Strategy & Implementation** (120 pts - 27%)
3. **Functionality & User Experience** (80 pts - 18%)
4. **Documentation & Technical Decisions** (80 pts - 18%)
5. **Deployment & DevOps** (50 pts - 11%)