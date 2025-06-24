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

## 🧾 RESTful API Routes

### 👤 User APIs
- `POST /user` – Create new user if not already exists

### 📚 Book APIs
- `POST /book` – Add a new book
- `GET /book?email=user@example.com` – Get books added by a user
- `GET /book/:id` – Get a single book by ID
- `DELETE /book/:id` – Delete a book by ID
- `PUT /book/:id` – Update book details
- `PATCH /upvote/:id` – Increment upvote count of a book
- `GET /all-books` – Get all books
- `GET /user/books?email=user@example.com` – Get user-specific books
- `GET /popular-books` – Get top 8 books sorted by upvotes
- `GET /recent-books` – Get latest 8 books added

### 📝 Review APIs
- `POST /review` – Submit a review (only one per user/book allowed)
- `GET /review/:id` – Get all reviews for a book
- `DELETE /review/:id` – Delete a review
- `PATCH /review/:id` – Update an existing review

### 📊 Category Aggregation
- `GET /book-category` – Get category count from all books
- `GET /user/category?email=user@example.com` – Get category count for a user's books

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


## 📁 Project Structure
<pre>
book-case-server/
├── index.js # Main server entry
├── .env # Environment variables
</pre>

## 🧪 Setup & Installation

```bash
git clone https://github.com/monishaRema/Bookcase-Server.git
cd book-case-server
npm install
