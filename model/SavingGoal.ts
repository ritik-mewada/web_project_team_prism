import { model, models, Schema } from "mongoose";

const SavingGoalSchema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    target: { type: Number, required: true },
    saved: { type: Number, default: 0 },
});

export const SavingGoal =
    models.SavingGoal || model("SavingGoal", SavingGoalSchema);
