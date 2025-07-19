import { model, models, Schema } from "mongoose";

const SubscriptionSchema = new Schema({
    userId: { type: String, required: true },
    service: { type: String, required: true },
    amount: { type: Number, required: true },
    frequency: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Subscription =
    models.Subscription || model("Subscription", SubscriptionSchema);
