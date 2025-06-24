<img src="https://github.com/monishaRema/bookcase-client/blob/main/src/assets/logo.png" />
# Book Case Server  
**Your digital bookshelf — powered by a secure, fast, and scalable backend.**

This is the **backend API server** for the [Book Case](https://book-case-92d50.web.app/) application — a modern platform that empowers readers to track, manage, and celebrate their reading journey with a social twist.

It provides RESTful endpoints to manage books, users, reviews, and upvotes — backed by JWT-based authorization and Firebase-authenticated identities. Deployed on Vercel for blazing-fast access.

---

## 🌐 Live API  
📡 **Backend Base URL:** `https://book-case-beta.vercel.app/`  
🔒 Protected endpoints secured by JWT + Firebase ID Token

---

## 🧭 Purpose  
The server-side engine of Book Case handles all the heavy lifting — from user authentication to book tracking and review management. It ensures:

- Reliable data storage with MongoDB  
- Secure authentication flows  
- Real-time API interactions for a responsive frontend  
- Robust authorization and route protection

> “A powerful backend to keep your bookshelf organized, interactive, and social.”

---

## 🚀 Core Features

### 📚 Book Management
- Add, update, and delete books
- Track status: Want to Read, Reading, or Read
- Store details: title, author, pages, cover, category, etc.

### 📝 Review System
- Submit and edit one review per book
- Community-wide review visibility
- Prevent self-review upvotes

### 👍 Upvote Logic
- Upvote books (except your own)
- Prevent multiple upvotes per user-book pair

### 📊 Dashboard & Analytics
- Backend aggregates data for total books, category distribution, and progress breakdown

### 🔐 Authentication & Authorization
- Firebase Authentication for signup/login via email or Google  
- JWT issued post-login for secured API access  
- Middleware to verify Firebase token & user role (admin/user)

### 🧾 RESTful API Routes
- `/books` – Manage book records  
- `/reviews` – Post/edit user reviews  
- `/upvotes` – Upvote/track popular books  
- `/dashboard` – Aggregated reading stats  
- `/users` – User account and role management  
- `/auth` – Token handling and session validation

---

## 🧰 Tech Stack

**Backend Frameworks & Libraries**
- **Node.js + Express** – Fast, lightweight REST server  
- **MongoDB + Mongoose** – Schema-based NoSQL database  
- **CORS + Helmet** – Secure API access across domains  
- **Firebase Admin SDK** – Verify tokens & manage users  
- **jsonwebtoken** – Generate and verify JWTs  
- **dotenv** – Manage environment configs  

**Authentication**
- Firebase Auth (Client-Side Login)  
- Firebase Admin SDK + JWT (Server-Side Auth & Role Check)

**Deployment**
- **Vercel** – Serverless hosting for backend APIs  
- **MongoDB Atlas** – Cloud database

---

## 🧪 Setup & Installation

```bash
git clone https://github.com/monishaRema/Bookcase-Server.git
cd book-case-server
npm install
