import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  // 取得所有使用者
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("無法取得使用者資料：", error.message);
    }
  };

  // 新增使用者
  const addUser = async () => {
    if (!name || !age || !city) {
      alert("請填寫完整資料！");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, city }),
      });
      if (response.ok) {
        fetchUsers();
        setName("");
        setAge("");
        setCity("");
      }
    } catch (error) {
      console.error("新增使用者失敗：", error.message);
    }
  };

  // 刪除使用者
  const deleteUser = async (id) => {
    try {
      await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (error) {
      console.error("刪除使用者失敗：", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>使用者管理</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={addUser}>新增使用者</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
