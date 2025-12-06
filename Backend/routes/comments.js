import express from 'express';
import Comment from '../models/Comment.js';
import authenticateJWT from '../middle.js';

const router = express.Router({ mergeParams: true });

router.get('/:carId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate('author', 'username')   
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


router.post('/:carId/comments', authenticateJWT, async (req, res) => {
  try {
    const { text } = req.body;
    const comment = new Comment({
      text,
      author: req.user.id,
      car: req.params.blogId
    });
    await comment.save();


    await comment.populate('author', 'username');

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка добавления комментария' });
  }
});



router.delete('/comments/:id', authenticateJWT, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Комментарий не найден' });

    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Нет прав' });
    }

    await comment.deleteOne();
    res.json({ message: 'Комментарий удалён' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;