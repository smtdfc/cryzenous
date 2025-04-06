# Cryzenous
**Simple Automation for Repetitive Tasks**

Cryzenous is a lightweight automation tool built to streamline repetitive workflows. It's designed to help developers and technical users save time by automating common tasks, reducing manual work, and improving productivity. Whether you're working with internal tools or building integrations, Cryzenous makes it easier and faster to automate operations.

---

## System Requirements

Before getting started, make sure the following tools are installed on your system:

- **Golang 1.18.x**: Required for backend development and code generation with Ent.  
- **Node.js 18.x**: Needed for building the frontend UI.  
- **MySQL**:  The relational database used by the backend for data storage.  

---

## Installation & Setup

### 1. Clone the Repository

Start by cloning the project from GitHub:

```bash
git clone https://github.com/smtdfc/cryzenous.git
cd cryzenous
```

---

### 2. Initialize the Database

Use the provided SQL schema file to create the necessary database tables:

```bash
mysql -u <username> -p <database_name> < databases/mysql/struct.sql
```

After setting up the database, generate the database models using Ent:

```bash
make entgen
```

This command uses [Ent](https://entgo.io/) to generate Go entities that map to your MySQL schema.

---

### 3. Create the `.env` Configuration File

In the project root directory, create a `.env` file with the following content:

```env
ALLOW_ORIGINS=http://localhost:3000              # Frontend origin (CORS)
BACKEND_URL=http://localhost:3000                 # API base URL
DATABASE_TYPE=mysql                               # Database type
DATABASE_DSN=username:password@tcp(127.0.0.1:3306)/dbname?parseTime=True
SERVER_PORT=3000                                  # Backend server port
```

**Note:**  
If you deploy the frontend and backend on the same domain/server, make sure `ALLOW_ORIGINS` and `BACKEND_URL` point to the same address (e.g., `http://yourdomain.com`).

---

### 4. Build the Project

Install frontend dependencies and build the UI:

```bash
npm install           # Install required packages
make buildui          # Build the frontend interface
```

The compiled frontend will be served by the backend once the server starts.

---

### 5. Start the Server

Run the following command to start the backend service:

```bash
make start
```

The server will launch on the port specified in `.env` (default is `3000`), and the API will be ready to receive requests.

---
