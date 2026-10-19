const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.json({ message: 'สวัสดี Back-End!' });
});
const members = [
  { id: 1, name: 'ฐีรภาสกร จุลพันธ์', role: 'Developer B' },
  { id: 2, name: 'นน์ทากิร', role: 'Developer A' },
];

const project = {
  team: 'IPadkid',
  topic: 'ระบบแจ้งร้องเรียนภายในวิทยาลัย',
  problem: 'นักศึกษาอาจพบปัญหาในวิทยาลัยแต่ไม่ทราบช่องทางแจ้งเรื่องที่สะดวกและติดตามผลได้',
  users: ['นักศึกษา', 'บุคลากรในวิทยาลัย'],
  members: members,
};

app.get('/project', (req, res) => {
  res.json(project);
});

const ideas = [
  { method: 'GET', path: '/complaints', detail: 'ดูรายการเรื่องร้องเรียนทั้งหมด' },
  { method: 'POST', path: '/complaints', detail: 'ส่งเรื่องร้องเรียนใหม่' },
  { method: 'GET', path: '/complaints/:id', detail: 'ดูรายละเอียดเรื่องร้องเรียน' },
  { method: 'PATCH', path: '/complaints/:id/status', detail: 'อัปเดตสถานะเรื่องร้องเรียน' },
];

app.get('/ideas', (req, res) => {
  res.json(ideas);
});

app.get('/members/:id', (req, res) => {
  const id = Number(req.params.id);
  const member = members.find((m) => m.id === id);

  if (!member) {
    return res.status(404).json({ message: 'ไม่พบสมาชิก' });
  }

  res.json(member);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
