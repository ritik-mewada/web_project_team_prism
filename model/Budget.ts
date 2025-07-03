import { Schema, models, model } from "mongoose";

const BudgetSchema = new Schema({
    userId: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Budget = models.Budget || model("Budget", BudgetSchema);
