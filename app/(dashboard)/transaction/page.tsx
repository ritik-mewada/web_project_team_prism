'use client';

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <main className="flex-1 p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <a href="/transaction/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition duration-200">
              + Add Transaction
            </button>
          </a>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-4">All Transactions</h3>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="pb-2">Date</th>
                <th className="pb-2">Description</th>
                <th className="pb-2">Category</th>
                <th className="pb-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'Apr 18, 2024', desc: 'Groceries', cat: 'Groceries', amt: '$100.00' },
                { date: 'Apr 15, 2024', desc: 'Salary', cat: 'Salary', amt: '$3,000.00' },
                { date: 'Apr 10, 2024', desc: 'Utilities', cat: 'Utilities', amt: '$75.00' },
                { date: 'Apr 05, 2024', desc: 'Rent', cat: 'Rent', amt: '$100.00' },
                { date: 'Apr 01, 2024', desc: '-', cat: '-', amt: '$1,200.00' },
              ].map((t, i) => (
                <tr key={i} className="border-t text-gray-800">
                  <td className="py-2">{t.date}</td>
                  <td>{t.desc}</td>
                  <td>{t.cat}</td>
                  <td className="text-right">{t.amt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
