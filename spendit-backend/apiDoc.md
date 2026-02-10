## API Documentation

### Base URL
| Environment | URL |
|------------|-----|
| Local | http://localhost:3000 |

---

### Authentication APIs

| Method | Endpoint | Description | Auth | Request Fields | Success | Errors |
|------|----------|-------------|------|----------------|---------|--------|
| POST | /user/register | Register a new user | No | name, email, password | 201 Created | 409 User exists |
| POST | /user/login | Login and get JWT | No | email, password | 200 OK | 401 Invalid credentials |

---

### Expense APIs (Protected)

| Method | Endpoint | Description | Auth | Request Fields | Success | Errors |
|------|----------|-------------|------|----------------|---------|--------|
| POST | /expenses/create | Create a new expense | Yes | amount, category, date, description (optional) | 201 Created | 400 Missing fields |
| GET | /expenses | Get all user expenses | Yes | — | 200 OK | 401 Unauthorized |
| GET | /expenses/:id | Get a specific expense | Yes | — | 200 OK | 400 Invalid ID, 404 Not found |
| PUT | /expenses/:id | Update an expense | Yes | amount, category, date, description (any) | 200 OK | 400 Invalid/empty update, 404 Not found |
| DELETE | /expenses/:id | Delete an expense | Yes | — | 200 OK | 400 Invalid ID, 404 Not found |

---

### Health Check

| Method | Endpoint | Description | Auth | Success |
|------|----------|-------------|------|---------|
| GET | /health | Check server status | No | 200 OK |
