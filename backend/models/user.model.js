import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

//check if user exists, else create new model with userSchema model schema
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;