import express from 'express';
import { getAllClasses, createClass } from '../services/classes/classes.service';

const router = express.Router();

// 모든 학급 조회
router.get('/classes', async (req, res) => {
  const result = await getAllClasses();
  if (result.success) {
    res.json(result.classes);
  } else {
    res.status(500).json({ message: result.message });
  }
});

// 학급 생성
router.post('/classes', async (req, res) => {
  const { name, teacherId } = req.body;
  const result = await createClass({ name, teacherId });
  if (result.success) {
    res.status(201).json(result.class);
  } else {
    res.status(400).json({ message: result.message });
  }
});

export default router;
