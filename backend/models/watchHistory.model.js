import mongoose from 'mongoose';

const watchHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: Number, required: true },
    title: String,
    poster_path: String,
    watched_at: { type: Date, default: Date.now }
});

const WatchHistory = mongoose.model("WatchHistory", watchHistorySchema);
export default WatchHistory;