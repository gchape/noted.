# Project: Noted.

## 👥 Team Information

- **Team Members**: Giorgi Chapidze

## 🎯 Project Vision

**Problem Statement**: People often capture thoughts, links, or todos across multiple apps and lose track. Noted. offers a minimalist and accessible place to store and organize notes.

**Target Users**: Students, developers, writers — anyone needing a fast, lightweight, distraction-free notes interface.

**Value Proposition**: Cross-platform accessibility, markdown support, and a clean UX with fast performance.

Sure — here is your updated `README.md` with the revised **API Design** and **Database Schema** sections to reflect your code more accurately:

---

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

- **API Design**:

  #### 🗒 Notes

  - `GET /api/notes`: Fetch all notes (optionally filtered by query, tag, favourite)
  - `GET /api/notes/:id`: Get a single note by ID
  - `POST /api/notes`: Create a new note

    - Requires: `title`, `content`, `user`

  - `PUT /api/notes/:id`: Update a note

    - Accepts: `title`, `content`, `url`, `tags`, `favourite`

  - `DELETE /api/notes/:id`: Delete a note
  - `GET /api/notes/search`: Search notes by `query`, `tag`, or `favourite`

  #### 👤 Users

  - `POST /api/users`: Register new user

    - Requires: `name`, `email`, `password`

  - `POST /api/users/login`: Login

    - Requires: `email`, `password`

  - `POST /api/users/logout`: Logout (clears cookie)
  - `GET /api/users/profile`: Get current authenticated user's profile _(Protected)_

- **Database Schema**:

  ```ts
  Note {
    _id: ObjectId,
    user: ObjectId,
    title: string,
    url?: string,
    content?: string,
    tags: string[],
    favourite: boolean,
    createdAt: Date,
    updatedAt: Date
  }
  ```

  #### 👤 User

  ```ts
  User {
    _id: ObjectId,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
  }
  ```

- **Authentication**:

  - **Method**: JSON Web Tokens (JWT)
  - **Login**: On login, a signed JWT is issued and sent as an HTTP-only cookie
  - **Storage**: Token is stored in a secure HTTP-only cookie with `SameSite=Strict`
  - **Middleware**: Protected routes use middleware to validate and decode JWT

---

### 🔑 Key Design Decisions

- **React with TypeScript**: Ensures type safety and improved DX on the frontend.
- **React Query**: Handles data fetching, caching, and background sync, minimizing boilerplate.
- **MongoDB**: Flexible schema suited for unstructured notes and quick prototyping.
- **JWT Authentication with HTTP-only cookies**: Balances security and usability for session management.
- **Modular API with Express**: Easy to extend and maintain individual route responsibilities.

---

## 🧪 Test-Driven Development Strategy

- **Core Features to Test**:

  - Note CRUD operations (API and UI)
  - Authentication logic
  - Error handling (e.g., 404 for nonexistent notes)
  - Form validation and input sanitization

- **Testing Approach**:

  - **Unit Tests**: For utility functions, API controllers (Jest)
  - **Integration Tests**: End-to-end API route tests (Supertest + Jest)
  - **Frontend Tests**: Component testing (React Testing Library), with mocked API calls

- **Test Coverage Goals**:

  - Aim for **80%+** code coverage across backend
  - Cover all **critical UI flows** (create/edit/delete note, auth)

---

## 📦 Feature Breakdown

## ✅ **Week 1: Notes UI**

1. [x] Create `NoteList` component to fetch and display user’s notes
2. [x] Create reusable `NoteCard` or list item UI for each note
3. [x] Create `NoteDetail` component to show a single note by ID
4. [x] Add loading and error states to queries (React Query)
5. [x] Add route structure for `/notes`, `/notes/:id`

---

## ✅ **Week 2: Auth Integration**

1. [x] Connect login form to backend via React Query mutation
2. [x] Connect register form to backend via mutation
3. [x] Handle JWT via HTTP-only cookie (test with `withCredentials`)
4. [x] Add protected routes logic based on user auth state
5. [x] Implement logout flow and clear user context

---

### ✅ **Week 3: Authentication UI**

1. [x] Set up basic React project structure with routes (`react-router`)
2. [x] Create `Login` form component with input validation
3. [x] Create `Register` form component with input validation
4. [x] Add navigation bar with login/logout/register links

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

- **AWS Services**:

  - **EC2**: Hosts Node backend and React frontend

- **Environment Variables**:

  - Use `.env` files (with `dotenv`)

- **Database Hosting**:

  - Use MongoDB

- **Domain & SSL**:

  - Free SSL via Let's Encrypt or ACM + NGINX reverse proxy

---

## 🤔 Potential Challenges & Solutions

- **Challenge 1**: Sync issues or stale data in UI

  - _Solution_: Use `react-query`'s invalidation and background re-fetch

- **Challenge 2**: Managing authentication securely in the browser

  - _Solution_: Use HTTP-only cookies for JWT storage and server-side session validation

---
