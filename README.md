# Noted.

## Team Information

- **Team Members**: Giorgi Chapidze

## Project Vision

**Problem Statement**: People often capture thoughts, links, or todos across multiple apps and lose track. Noted. offers a minimalist and accessible place to store and organize notes.

**Target Users**: Students, developers, writers — anyone needing a fast, lightweight, distraction-free notes interface.

**Value Proposition**: Cross-platform accessibility, markdown support, and a clean UX with fast performance.

---

## Architecture & Technical Design

### Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: Node.js + TypeScript with Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: AWS EC2 (or similar)
- **Testing**: Jest (planned)

### Backend Summary

The backend is built using Express and TypeScript, with a MongoDB database accessed via Mongoose. The backend provides RESTful APIs for users and notes with JWT-based authentication.

#### Features:

- **User Authentication**

  - Register new users (`POST /api/users`)
  - Login users and issue JWT tokens (`POST /api/users/login`)
  - Get profile info of authenticated users (`GET /api/users/profile`)

- **Notes Management**
  - Get all notes for authenticated user (`GET /api/notes`)
  - Create a new note (`POST /api/notes`)
  - Search notes with filters like query text, tag, and favourite (`GET /api/notes/search`)
  - Fetch unique tags used by the user (`GET /api/notes/tags`)

#### Authentication Flow

- Users authenticate via JWT tokens.
- Tokens are sent in the `Authorization` header as `Bearer <token>`.
- Middleware validates tokens and protects routes.
- User ID is extracted from the token to query user-specific data.

---

### API Design

#### Notes

| Method | Endpoint            | Description                            | Notes                              |
| ------ | ------------------- | -------------------------------------- | ---------------------------------- |
| GET    | `/api/notes`        | Fetch all notes for the logged-in user | Requires authentication            |
| POST   | `/api/notes`        | Create a new note                      | Requires `title` and `content`     |
| GET    | `/api/notes/search` | Search notes by query, tag, favourite  | Filters supported via query params |
| GET    | `/api/notes/tags`   | Get unique tags for the user's notes   | Requires authentication            |

#### Users

| Method | Endpoint             | Description                      | Notes                       |
| ------ | -------------------- | -------------------------------- | --------------------------- |
| POST   | `/api/users`         | Register a new user              | Password minimum length 6   |
| POST   | `/api/users/login`   | Login user and receive JWT token | Returns token and user data |
| GET    | `/api/users/profile` | Get logged-in user's profile     | Requires authentication     |

---

### Database Schema

```ts
interface Note {
  _id: ObjectId;
  user: ObjectId;
  title: string;
  url?: string;
  content?: string;
  tags: string[];
  favourite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string; // hashed
  createdAt: Date;
  updatedAt: Date;
}
```

**Authentication**:

- **Method**: JSON Web Tokens (JWT)
- **Login**: On login, a signed JWT is issued and sent as an HTTP-only cookie
- **Storage**: Token is stored in a secure HTTP-only cookie with `SameSite=Strict`
- **Middleware**: Protected routes use middleware to validate and decode JWT

---

### Key Design Decisions

- **React with TypeScript**: Ensures type safety and improved DX on the frontend.
- **React Query**: Handles data fetching, caching, and background sync, minimizing boilerplate.
- **MongoDB**: Flexible schema suited for unstructured notes and quick prototyping.
- **JWT Authentication with HTTP-only cookies**: Balances security and usability for session management.
- **Modular API with Express**: Easy to extend and maintain individual route responsibilities.

---

## Test-Driven Development Strategy

- **Core Features to Test**:

  - Note CRUD operations (API and UI)
  - Authentication logic
  - Error handling (e.g., 404 for nonexistent notes)
  - Form validation and input sanitization

- **Testing Approach**:

  - **Unit Tests**: For utility functions, API controllers (Jest)
  - **Frontend Tests**: Component testing (React Testing Library), with mocked API calls

- **Test Coverage Goals**:

  - Aim for **80%+** code coverage across backend
  - Cover all **critical UI flows** (create/edit/delete note, auth)

---

## Feature Breakdown

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

1. [x] Build `AddNote` component with title/content fields
2. [x] Hook up `AddNote` to backend with mutation
3. [x] Add cancel/back navigation between forms and views

---

### ✅ **Week 5: Polish & Mobile Responsiveness**

1. [x] Make all views mobile-responsive with CSS media queries or Tailwind
2. [x] Add global UI feedback: toasts, modals, or banners for success/errors
3. [x] Validate input on all note forms (e.g., title required)
4. [x] Add confirm delete dialog for notes
5. [x] Apply basic theming: color palette, spacing, consistent typography

---

Got it! Here's a tailored **Deployment Strategy** update for your README to reflect your backend on AWS and frontend on Render:

---

## Deployment Strategy

### Backend

- **Hosting**: Deployed on **AWS EC2**
- **Server**: Runs Node.js + Express app
- **Environment Variables**: Managed via `.env` files on EC2 instance
- **Database**: MongoDB hosted either on MongoDB Atlas or a managed MongoDB instance
- **Security**:

  - JWT secret and DB credentials stored securely as environment variables

- **Monitoring & Logging**:
  - Use AWS CloudWatch or third-party logging tools (e.g., Loggly)

### Frontend

- **Hosting**: Deployed on **Render.com**
- **Build & Deployment**:

  - React app built and deployed via Render’s automated Git integration
  - Connected to backend via environment variable `VITE_API_URL` pointing to AWS backend URL

- **CORS**:

  - Backend configured to accept requests from frontend domain on Render

- **SSL**:

  - Render provides automatic HTTPS via Let’s Encrypt

---
