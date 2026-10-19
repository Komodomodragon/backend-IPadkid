const express = require('express');
const app = express();
app.use(express.json()); 

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

// ข้อมูลตั้งต้นของ resource หลัก (เก็บในหน่วยความจำ)
let Students = [
  { id: 1, name: 'นักศึกษาคนที่ 1', lastname: 'นามสกุล 1',depart: 'เทคโนโลยีสารสนเทศ', classroom: '4/1' },
  { id: 2, name: 'นักศึกษาคนที่ 2', lastname: 'นามสกุล 2', depart: 'การท่องเที่ยว', classroom: '1/2' },
];
let nextId = 3;

app.get('/students', (req, res) => {
  const { status } = req.query; 
  if (status) {
    res.json(Students.filter(s => s.status === status));
    } 
    res.json(Students);
});

// R: ดู 1 รายการ
app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = Students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: 'ไม่พบรายการนักศึกษา' });
  }
  res.json(student);
});

// C: เพิ่ม
app.post('/students', (req, res) => {
  const { name,lastname,depart,classroom } = req.body;
  if (!name || !lastname || !depart || !classroom)
    {
    return res.status(400).json({ message: 'ต้องส่ง name, lastname, depart และ classroom' });
  }
  const student = { id: nextId++, name, lastname, depart, classroom };
  Students.push(student);
  res.status(201).json(student);
});

// U: แก้ไข
app.put('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = Students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: 'ไม่พบรายการนักศึกษา' });
  }
  student.name = req.body.name ?? student.name;
  student.lastname = req.body.lastname ?? student.lastname;
  student.depart = req.body.depart ?? student.depart;
  student.classroom = req.body.classroom ?? student.classroom;
  res.json(student);
});

// D: ลบ
app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = Students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'ไม่พบรายการนักศึกษา' });
  }
  Students.splice(index, 1);
  res.status(204).send();
});
 
// ไม่ตรงกับ route ใดเลย
app.use((req, res) => {
  res.status(404).json({ message: `ไม่มี ${req.method} ${req.path} ในระบบ` });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
