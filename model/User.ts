import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, defualt: "User" },
});

export const User = models.User || model("User", UserSchema);
