# Dadinho Game API

A RESTful API for the **Dadinho** game, managing user authentication, profiles, and the core game logic.

---

## Technologies Used

* **Node.js** (Runtime environment)
* **Express.js** (RESTful API framework)
* **JSON Web Token (JWT)** (Authentication and authorization)
* **bcryptjs** (Password hashing)
* **Prisma** (ORM for database persistence)
* **MySQL** (Relational database)
* **Docker** (Containerization for local database setup)
* **npm** (Dependency management)

---

## Authentication

### Register a New User

`POST /register`

Creates a new user in the database.

**Request Body:**

```json
{
  "name": "Your Name",
  "email": "user@email.com",
  "password": "your_password_123"
}
```

**Response (Success):**

```json
{
  "token": "ey... (your JWT token)"
}
```

---

### User Login

`POST /login`

Authenticates an existing user and returns a JWT token valid for 1 hour.

**Request Body:**

```json
{
  "email": "user@email.com",
  "password": "your_password_123"
}
```

**Response (Success):**

```json
{
  "token": "ey... (your JWT token)"
}
```

---

## API Endpoints

*All routes below require a valid JWT token sent in the header:*
`Authorization: Bearer <token>`

---

### User API

#### List All Users

`GET /users`

#### Get User by ID

`GET /users/:id`

#### Update User Data

`PUT /users/:id`

**Request Body:**

```json
{
  "name": "New Username",
  "email": "new@email.com"
}
```

#### Delete User

`DELETE /users/:id`

---

## Running Locally (Development)

This project uses **Docker Compose** to automatically start a MySQL database container.

### 1. Clone the Repository

```bash
git clone https://your-repository-here.git
cd dadinho-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

The `start` script will:

* Start the Docker container with MySQL (`docker-compose up`)
* Apply Prisma migrations to create the database schema (`npx prisma migrate dev`)
* Launch the API server with **nodemon** for live reload

```bash
npm start
```

If it does not work at first try again

### 4. Access the Application

Once running, the API will be available at:
`http://localhost:3000`
