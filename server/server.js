const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Добавлено
const app = express();

app.use(cors({
  origin: 'http://localhost:3001', // Укажите URL вашего фронтенда
  credentials: true  
}));

const pool = new Pool({
  user: 'chekhxv',
  host: 'localhost',
  database: 'finance_control',
  password: 'Dfdbkju123',
  port: 5432,
});

app.use(express.json());

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Для продакшн: { secure: true }
}));

const JWT_SECRET = 'your_jwt_secret'; // Добавлено

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware для проверки JWT токена
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/register', async (req, res) => {
  const { fullName, email, phone, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Пароли не совпадают" });
  }

  try {
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR phone_number = $2',
      [email, phone]
    );

    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0];
      if (user.email === email) {
        return res.status(409).json({ error: "Email уже занят" });
      }
      if (user.phone_number === phone) {
        return res.status(409).json({ error: "Телефон уже занят" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await pool.query(
      'INSERT INTO users (full_name, email, phone_number, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [fullName, email, phone, hashedPassword]
    );

    const token = generateToken(newUser.rows[0]); // Добавлено
    res.status(201).json({ user: newUser.rows[0], token }); // Изменено
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при регистрации пользователя" });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (rows.length > 0) {
      const isValid = await bcrypt.compare(password, rows[0].password);

      if (isValid) {
        const token = generateToken(rows[0]); // Добавлено
        res.json({ message: "Вход выполнен успешно", token }); // Изменено
      } else {
        res.status(400).json({ message: "Неверный пароль" });
      }
    } else {
      res.status(404).json({ message: "Пользователь не найден" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при входе в систему" });
  }
});

// Пример защищенного маршрута
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: "Это защищенный маршрут" });
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
