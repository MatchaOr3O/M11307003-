const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// 使用中介軟體
app.use(cors());
app.use(bodyParser.json());

let users = []; // 模擬資料庫

// 取得所有使用者
app.get("/api/users", (req, res) => {
  res.json(users);
});

// 新增使用者
app.post("/api/users", (req, res) => {
  const { name, age, city } = req.body;
  const id = users.length + 1; // 模擬 ID
  const newUser = { id, name, age, city };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 刪除使用者
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== parseInt(id, 10));
  res.status(204).send();
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`後端伺服器運行於 http://localhost:${PORT}`);
});
