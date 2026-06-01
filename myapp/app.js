require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();

app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER
});

// ルート1：トップページ
app.get('/', (req, res) => {
    res.send('トップページです');
});

// ルート2：自己紹介ページ
app.get('/about', (req, res) => {
    res.send('自己紹介ページです');
});

// ルート3：現在時刻
app.get('/time', (req, res) => {
    const now = new Date().toLocaleString('ja-JP');
    res.send('現在時刻：' + now);
});

// API確認
app.get('/api/test', (req, res) => {
    res.json({
        message: "APIが動いています",
        status: "ok"
    });
});

// GET：メッセージ取得
app.get('/api/messages', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM messages ORDER BY created_at ASC'
        );

        res.json(result.rows);

    } catch(err) {
        console.error(err);
        res.status(500).json({
            error: "DBエラー"
        });
    }
});

// POST：メッセージ追加
app.post('/api/messages', async (req, res) => {

    try {
        const { username, text } = req.body;

        const result = await pool.query(
            'INSERT INTO messages (username, text) VALUES ($1,$2) RETURNING *',
            [username, text]
        );

        res.json(result.rows[0]);

    } catch(err) {
        console.error(err);
        res.status(500).json({
            error: "DBエラー"
        });
    }
});

// 404
app.use((req, res) => {
    res.status(404).send('ページが見つかりません');
});

app.listen(3000, () => {
    console.log('サーバー起動: http://localhost:${process.env.PORT || 3000}');
});