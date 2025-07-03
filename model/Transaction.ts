import { model, models, Schema } from "mongoose";

const transactionSchema = new Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Transaction =
    models.Transaction || model("Transaction", transactionSchema);
