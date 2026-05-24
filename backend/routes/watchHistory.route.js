import express from 'express';
import jwt from 'jsonwebtoken';
import WatchHistory from '../models/watchHistory.model.js';

const router = express.Router();

// helper to get userId from cookie
const getUserId = (req) => {
  const { token } = req.cookies;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
};

// POST — log a movie
router.post('/', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: "Not logged in." });

  const { movieId, title, poster_path } = req.body;
  try {
    await WatchHistory.findOneAndUpdate(
      { userId, movieId },
      { title, poster_path, watchedAt: new Date() },
      { upsert: true }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET — fetch user's history
router.get('/', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: "Not logged in." });

  try {
    const history = await WatchHistory.find({ userId })
      .sort({ watchedAt: -1 })
      .limit(20);
    res.status(200).json({ success: true, history });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;