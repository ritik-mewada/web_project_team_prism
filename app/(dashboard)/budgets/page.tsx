'use client';

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Budgets</h2>
          <a href="/budgets/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition duration-200">
              + Add Budget
            </button>
          </a>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-4">Budget Overview</h3>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="pb-2">Category</th>
                <th className="pb-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cat: 'Groceries', amt: '$200.00' },
                { cat: 'Entertainment', amt: '$150.00' },
                { cat: 'Utilities', amt: '$100.00' },
              ].map((b, i) => (
                <tr key={i} className="border-t text-gray-800">
                  <td className="py-2">{b.cat}</td>
                  <td className="text-right">{b.amt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
