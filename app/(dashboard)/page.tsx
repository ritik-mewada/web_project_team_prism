'use client';

import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
    
      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <button className="text-sm text-blue-600 hover:underline">Log out</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">Total Income</p>
            <p className="text-xl font-bold">$5,000</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="text-xl font-bold">$2,200</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">Savings Progress</p>
            <p className="text-xl font-bold">$800</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Expense Categories</h3>
            <div className="max-w-[300px] mx-auto">
              <Doughnut
                data={{
                  labels: ['Groceries', 'Utilities', 'Rent', 'Others'],
                  datasets: [{
                    data: [30, 20, 25, 25],
                    backgroundColor: ['#f97316', '#10b981', '#3b82f6', '#facc15'],
                    borderWidth: 1,
                  }]
                }}
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: '#1f2937', // text-gray-800
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Monthly Trends</h3>
            <Bar
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                  label: 'Expenses',
                  data: [400, 450, 500, 600, 550, 700],
                  backgroundColor: '#3b82f6',
                  borderRadius: 6,
                }]
              }}
              options={{
                responsive: true,
                plugins: { 
                  legend: { display: false } 
                },
                scales: {
                  x: {
                    ticks: { color: '#1f2937' } // text-gray-800
                  },
                  y: {
                    beginAtZero: true,
                    ticks: { color: '#1f2937' } // text-gray-800
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-4">Recent Transactions</h3>
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
                { date: 'Apr 20, 2024', desc: 'Groceries', cat: 'Groceries', amt: '$150.00' },
                { date: 'Apr 15, 2024', desc: 'Salary', cat: 'Income', amt: '$3,000.00' },
                { date: 'Apr 01, 2024', desc: 'Rent', cat: 'Rent', amt: '$1,200.00' },
                { date: 'Mar 22, 2024', desc: 'Internet', cat: 'Utilities', amt: '$60.00' },
                { date: 'Mar 19, 2024', desc: 'Dining Out', cat: 'Entertainment', amt: '$45.00' }
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
