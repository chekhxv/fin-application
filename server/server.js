const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
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
  cookie: { secure: false }
}));

const JWT_SECRET = 'my_super_secret_key_12345';

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '99999h' });
};

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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

    const token = generateToken(newUser.rows[0]);
    res.status(201).json({ user: newUser.rows[0], token });
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
        const token = generateToken(rows[0]);
        res.json({ message: "Вход выполнен успешно", token });
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

app.post('/api/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const { rows } = await pool.query('SELECT full_name AS "fullName", email, avatar FROM users WHERE id = $1', [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении данных пользователя' });
  }
});

app.post('/api/user/avatar', authenticateToken, async (req, res) => {
  const { avatar } = req.body;
  const { id } = req.user;

  try {
    await pool.query('UPDATE users SET avatar = $1 WHERE id = $2', [avatar, id]);
    res.json({ message: 'Avatar updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при обновлении аватара' });
  }
});

app.get('/api/transactions', authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM transactions WHERE user_id = $1', [req.user.id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении транзакций' });
  }
});

// Добавление новой категории
app.post('/api/categories', authenticateToken, async (req, res) => {
  const { name } = req.body;
  const color = generateRandomColor();
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO categories (name, color, user_id) VALUES ($1, $2, $3) RETURNING *',
      [name, color, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при добавлении категории' });
  }
});

// Получение всех категорий
app.get('/api/categories', authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories WHERE user_id = $1', [req.user.id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении категорий' });
  }
});

// Получение статистики
app.get('/api/statistics', authenticateToken, async (req, res) => {
  try {
    // Пример запроса статистики
    const { rows } = await pool.query('SELECT category, SUM(amount) as total FROM transactions WHERE user_id = $1 GROUP BY category', [req.user.id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении статистики' });
  }
});

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: "JWT works correctly and you have access to this protected route." });
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
