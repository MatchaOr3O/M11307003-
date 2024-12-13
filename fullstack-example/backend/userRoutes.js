const express = require('express');
const axios = require('axios');
const User = require('../models/User');
const router = express.Router();

// 初始化資料庫 (導入範例資料)
router.post('/initialize', async (req, res) => {
    try {
        const sampleUsers = [
            {
                id: 1,
                name: "Susanna Hayes",
                company: "Rippin and Sons",
                username: "Jimmie.Kutch21",
                email: "Lee39@hotmail.com",
                address: "1558 Kent Road",
                zip: "80452",
                state: "Montana",
                country: "Mauritania",
                phone: "880-405-2851 x0239",
                photo: "https://json-server.dev/ai-profiles/52.png"
            },
            {
                "id": 2,
                "name": "Shanny Faker Attribute Error: person.astName is not supported",
                "company": "Franecki LLC",
                "username": "Teresa47",
                "email": "Aiyana.Kunze64@gmail.com",
                "address": "48332 Prohaska Streets",
                "zip": "44797-5120",
                "state": "Kentucky",
                "country": "Rwanda",
                "phone": "(664) 781-1123 x480",
                "photo": "https://json-server.dev/ai-profiles/6.png"
              },
              {
                "id": 3,
                "name": "Caleigh Ratke",
                "company": "Gulgowski and Sons",
                "username": "Grant_McCullough",
                "email": "Paul.DuBuque@gmail.com",
                "address": "253 Rocky Village",
                "zip": "45973-4488",
                "state": "Tennessee",
                "country": "Tuvalu",
                "phone": "560.950.4975 x4348",
                "photo": "https://json-server.dev/ai-profiles/37.png"
              },
              {
                "id": 4,
                "name": "Jay Hoeger",
                "company": "Swaniawski - Kunze",
                "username": "Anika0",
                "email": "Jordan43@yahoo.com",
                "address": "9153 Vivian Common",
                "zip": "35912",
                "state": "New Jersey",
                "country": "Netherlands",
                "phone": "331.431.2601 x172",
                "photo": "https://json-server.dev/ai-profiles/61.png"
              },
              {
                "id": 5,
                "name": "Lacy Morar",
                "company": "Miller, Mante and Kertzmann",
                "username": "Renee.Cronin",
                "email": "Dominique.Lynch@yahoo.com",
                "address": "879 Stiedemann Point",
                "zip": "86081",
                "state": "Rhode Island",
                "country": "Cuba",
                "phone": "931-550-7989 x671",
                "photo": "https://json-server.dev/ai-profiles/53.png"
              },
              {
                "id": 6,
                "name": "Ferne Trantow",
                "company": "Baumbach Inc",
                "username": "Wilton.West63",
                "email": "Reece.Bahringer0@gmail.com",
                "address": "9085 E 2nd Street",
                "zip": "15780",
                "state": "Illinois",
                "country": "Guadeloupe",
                "phone": "1-868-445-2421 x61113",
                "photo": "https://json-server.dev/ai-profiles/52.png"
              },
              {
                "id": 7,
                "name": "Rhianna Hauck",
                "company": "Mosciski - Kutch",
                "username": "Constantin.Sipes15",
                "email": "Jana.McCullough92@yahoo.com",
                "address": "4596 Garth Light",
                "zip": "25841-2239",
                "state": "Pennsylvania",
                "country": "Trinidad and Tobago",
                "phone": "710-289-7702 x8124",
                "photo": "https://json-server.dev/ai-profiles/22.png"
              },
              {
                "id": 8,
                "name": "Trey Hamill",
                "company": "Bednar - Willms",
                "username": "Joan_Bogan99",
                "email": "Donnell67@yahoo.com",
                "address": "732 Mosciski Ranch",
                "zip": "78895",
                "state": "Wyoming",
                "country": "Jersey",
                "phone": "718-652-9999",
                "photo": "https://json-server.dev/ai-profiles/14.png"
              },
              {
                "id": 9,
                "name": "Jason Orn",
                "company": "Bradtke Group",
                "username": "Jules_Swaniawski96",
                "email": "Elroy50@gmail.com",
                "address": "5572 Cullen Streets",
                "zip": "57364",
                "state": "Florida",
                "country": "Moldova",
                "phone": "771-560-1225 x232",
                "photo": "https://json-server.dev/ai-profiles/45.png"
              },
              {
                "id": 10,
                "name": "Cristal Greenholt",
                "company": "Parker Group",
                "username": "Dovie.Gibson",
                "email": "Cynthia.Littel37@yahoo.com",
                "address": "1346 Sycamore Close",
                "zip": "30154-1059",
                "state": "Kentucky",
                "country": "Yemen",
                "phone": "853.487.4947 x9352",
                "photo": "https://json-server.dev/ai-profiles/57.png"
              },
            // ...其他用戶資料
        ];
        await User.deleteMany(); // 清空資料庫
        await User.insertMany(sampleUsers); // 插入範例資料
        res.status(200).json({ message: "Database initialized with sample data!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 獲取所有用戶
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 新增用戶
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 刪除用戶
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
              