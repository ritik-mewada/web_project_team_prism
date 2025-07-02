'use client';
export default function Page() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Budget</h2>
      <form className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Category</label>
          <select className="w-full border p-2 rounded">
            <option>Select category</option>
            <option>Groceries</option>
            <option>Utilities</option>
            <option>Entertainment</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Amount</label>
          <input type="number" className="w-full border p-2 rounded" placeholder="$" />
        </div>
        <div>
          <label className="block mb-1">Month</label>
          <select className="w-full border p-2 rounded">
            <option>Month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
          </select>
        </div>
        <div className="flex justify-end gap-4">
          <button type="button" className="text-gray-600 hover:underline">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Budget</button>
        </div>
      </form>
    </div>
  );
}
