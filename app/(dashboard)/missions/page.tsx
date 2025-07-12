"use client";
import React from "react";

// ✅ Completed Milestones
const completedMissions = [
  {
    title: "🎯 Goal Reacher",
    message: "You saved 100% of your Laptop Goal!",
    badge: "Goal Reached",
  },
  {
    title: "💸 First Step to Freedom",
    message: "Made your first debt payment.",
    badge: "Debt Breaker",
  },
  {
    title: "🏠 Rent Planner",
    message: "Successfully tracked and paid rent for 3 months.",
    badge: "Consistent Payer",
  },
];

// 🚀 Upcoming Milestones (Mixed type: some with progress, some with badge only)
const upcomingMissions = [
  {
    title: "📈 Budget Master",
    message: "Created your first monthly budget and stuck to it.",
    badge: "Budget Beginner",
  },
  {
    title: "💳 Credit Smart",
    message: "Paid off a full credit card bill on time.",
    badge: "Credit Responsible",
  },
  {
    title: "🛍️ Mindful Spender",
    message: "Logged all expenses for 30 consecutive days.",
    badge: "Expense Tracker",
  },
  {
    title: "📱 Save for New Phone",
    progress: 60,
    goal: "$1,000",
    current: "$600",
  },
  {
    title: "🏖️ Vacation Fund",
    progress: 35,
    goal: "$2,000",
    current: "$700",
  },
  {
    title: "🚗 Car Down Payment",
    progress: 20,
    goal: "$5,000",
    current: "$1,000",
  },
  {
    title: "🎓 Student Loan Repayment",
    progress: 10,
    goal: "$15,000",
    current: "$1,500",
  },
  {
    title: "🏡 Emergency Fund",
    progress: 45,
    goal: "$3,000",
    current: "$1,350",
  },
  {
    title: "💍 Wedding Budget",
    progress: 25,
    goal: "$10,000",
    current: "$2,500",
  },
];

const MissionsPage = () => {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Your Achievements</h1>

      {/* Completed Milestones */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">🎉 Completed Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completedMissions.map((m, index) => (
            <div key={index} className="border rounded-xl p-4 shadow bg-white">
              <h3 className="text-xl font-semibold">{m.title}</h3>
              <p className="text-gray-700">{m.message}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {m.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Future Milestones */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">🚀 Future Milestones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingMissions.map((m, index) => (
            <div key={index} className="border rounded-xl p-4 shadow bg-white">
              <h3 className="text-xl font-semibold">{m.title}</h3>
              {m.message && (
                <p className="text-gray-700">{m.message}</p>
              )}
              {m.badge && (
                <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                  {m.badge}
                </span>
              )}
              {m.progress !== undefined && m.goal && m.current && (
                <>
                  <p className="text-gray-600 mt-2">
                    Progress: {m.current} / {m.goal}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{ width: `${m.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1 text-blue-600">{m.progress}% completed</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionsPage;
