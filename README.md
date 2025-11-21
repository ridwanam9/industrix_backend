# Industrix Todo App — Backend
This is the backend for the code challenge provided by Industrix

### 🗄️ Setup Backend

```bash
git clone https://github.com/ridwanam9/industrix_backend.git
cd industrix_backend
npm install
```

#### Create PostgreSQL databases:
```bash
createdb industrix_todo
createdb industrix_todo_test
```

#### Configure database credentials

Edit /backend/config/config.json:
```json
{
  "development": {
    "username": "postgres",
    "password": "yourpassword",
    "database": "industrix_todo",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "yourpassword",
    "database": "industrix_todo_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

#### Run migrations (if using sync, skip)

```bash
npx sequelize-cli db:migrate
```

#### Start backend:
```bash
npm run dev
```

Backend runs at:

➡️ http://localhost:5000