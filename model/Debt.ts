import { model, models, Schema } from "mongoose";

const DebtSchema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Debt = models.Debt || model("Debt", DebtSchema);
