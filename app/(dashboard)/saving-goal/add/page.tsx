'use client';

import { useState } from 'react';

export default function AddSavingGoal() {
  const [goal, setGoal] = useState({
    name: '',
    target: '',
    saved: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Saving Goal:', goal);
    // TODO: send to API or DB
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <h2 className="text-xl font-semibold mb-4">Add Savings Goal</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Goal Name"
          value={goal.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="target"
          placeholder="Target Amount"
          value={goal.target}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="saved"
          placeholder="Amount Already Saved"
          value={goal.saved}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Save Goal
        </button>
      </form>
    </div>
  );
}
