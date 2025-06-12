'use client'

import Link from "next/link";
import { useState } from "react";

type Order = {
  id: string
  user: string
  userId: string
  products: string
  total: number
  status: string
  createdAt: string
}

const testdata: Order[] = [
  {
    id: "O001",
    user: "User",
    userId: "U123",
    products: "Cream",
    total: 50000,
    status: "Хүргэгдсэн",
    createdAt: "2025-06-09"
  }
];

const AdminOrdersPage = () => {
  const [orders] = useState<Order[]>(testdata);

  return (
    <div className="p-4">
      <h2 className="secondary-header mb-6">Захиалгын жагсаалт</h2>

      <div className="overflow-x-auto bg-white shadow">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-white text-gray-700 text-left text-xs">
              <th className="px-4 py-2">Захиалга ID</th>
              <th className="px-4 py-2">Хэрэглэгч</th>
              <th className="px-4 py-2">Бүтээгдэхүүн</th>
              <th className="px-4 py-2">Нийт</th>
              <th className="px-4 py-2">Төлөв</th>
              <th className="px-4 py-2">Огноо</th>
              <th className="px-4 py-2">Үйлдэл</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t text-sm">
                <td className="px-4 py-2">{o.id}</td>
                <td className="px-4 py-2">{o.user}</td>
                <td className="px-4 py-2">{o.products}</td>
                <td className="px-4 py-2">{o.total.toLocaleString()}₮</td>
                <td className="px-4 py-2">{o.status}</td>
                <td className="px-4 py-2">{o.createdAt}</td>
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/order/edit/${o.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Төлөв засах
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
