const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.json({ message: 'สวัสดี Back-End!' });
});

// ⭐⭐ วางไว้เหนือบรรทัด app.listen
const members = [
  { id: 1, name: 'นายนันทกิจ บุญทิวนาค', role: 'Api coder' },
  { id: 2, name: 'ฐีรภาสกร จุลพันธ์', role: 'Database tester' },
];

const project = {
  team: 'IPadkid',
  topic: 'ระบบรายงานการทำผิดกฏในวิทยาลัย',
  problem: 'พบการทำผิดกฏแต่ไม่กล้าแจ้ง ดำเนินการบล่าช้า เรื่องส่งไม่ถึง',
  users: ['student', 'teacher'],
  members: members,
};
app.get('/project', (req, res) => {
  res.json(project);
});

const ideas = [
  {
    "id": 1,
    "method": "GET",
    "path": "/reports",
    "description": "ดูรายการแจ้งผู้กระทำผิดกฎระเบียบ",
    "caller": "เจ้าหน้าที่หรือผู้ดูแลระบบ"
  },
  {
    "id": 2,
    "method": "POST",
    "path": "/reports",
    "description": "ส่งข้อมูลแจ้งเหตุเมื่อพบผู้กระทำผิดกฎระเบียบ",
    "caller": "นักศึกษา"
  },
  {
    "id": 3,
    "method": "GET",
    "path": "/reports/:id",
    "description": "ดูรายละเอียดรายงานตามหมายเลขรายการแจ้งเหตุ",
    "caller": "เจ้าหน้าที่และผู้แจ้งที่มีสิทธิ์เข้าถึง"
  }
]

app.get('/ideas', (req, res) => {
  res.json(ideas);
});

app.get('/members/:id', (req, res) => {
  const id = Number(req.params.id);                  // /members/2 ได้ id = 2
  const member = members.find((m) => m.id === id);   // หาสมาชิกที่ id ตรงกัน
  if (!member) {                                     // ถ้าหาไม่พบ
    return res.status(404).json({ message: 'Not foundddd' });
  }
  res.json(member);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
