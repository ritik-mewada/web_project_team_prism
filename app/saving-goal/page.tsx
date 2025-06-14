'use client';

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <main className="flex-1 p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Savings Goals</h2>
          <a href="/saving-goal/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition duration-200">
              + Add Savings Goal
            </button>
          </a>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-4">Your Goals</h3>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="pb-2">Goal</th>
                <th className="pb-2 text-right">Target Amount</th>
                <th className="pb-2 text-right">Amount Saved</th>
              </tr>
            </thead>
            <tbody>
              {[
                { goal: 'Emergency Fund', target: '$5,000.00', saved: '$2,500.00' },
                { goal: 'New Car', target: '$15,000.00', saved: '$10,000.00' },
                { goal: 'Vacation', target: '$3,000.00', saved: '$1,000.00' },
              ].map((g, i) => (
                <tr key={i} className="border-t text-gray-800">
                  <td className="py-2">{g.goal}</td>
                  <td className="text-right">{g.target}</td>
                  <td className="text-right">{g.saved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
