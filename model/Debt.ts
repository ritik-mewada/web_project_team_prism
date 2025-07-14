import { Schema, models, model } from "mongoose";

const DebtSchema = new Schema({
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Debt = models.Debt || model("Debt", DebtSchema);