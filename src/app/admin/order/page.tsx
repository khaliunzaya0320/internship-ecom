"use client";

import { useEffect, useState } from "react";

type Order = {
  id: number;
  userId: number;
  user: string;
  items: string[]; 
  total: number;
  status: "PENDING" | "SHIPPED";
  createdAt: Date | string;
};

const AdminOrderPage = () => {
  const [order, setOrder] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<"PENDING" | "SHIPPED">("PENDING");
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    const res = await fetch("/api/order");
    const data = await res.json();
    setOrder(data);
  };

  const updateStatus = async () => {
    if (!selectedOrder) return;
    setLoading(true);
    await fetch(`/api/order/${selectedOrder.id}`, {
      method: "PUT",
      body: JSON.stringify({ status: newStatus }),
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    setSelectedOrder(null);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="secondary-header mb-6">Захиалгын жагсаалт</h2>

      <div className="overflow-x-auto bg-white shadow">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-white text-gray-700 text-left text-xs">
              <th className="px-4 py-2">№</th>
              <th className="px-4 py-2">Хэрэглэгч</th>
              <th className="px-4 py-2">Бүтээгдэхүүн</th>
              <th className="px-4 py-2">Нийт</th>
              <th className="px-4 py-2">Төлөв</th>
              <th className="px-4 py-2">Огноо</th>
              <th className="px-4 py-2">Үйлдэл</th>
            </tr>
          </thead>

          <tbody>
            {order.map((o, idx) => (
              <tr key={o.id} className="border-t text-sm">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{o.id}</td>
                <td className="px-4 py-2">
                  {Array.isArray(o.items) ? o.items.join(", ") : ""}
                </td>
                <td className="px-4 py-2">{o.total.toLocaleString()}₮</td>
                <td className="px-4 py-2">{o.status}</td>
                <td className="px-4 py-2">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setSelectedOrder(o);
                      setNewStatus(o.status);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Төлөв засах
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-[300px]">
            <h3 className="text-lg font-semibold mb-4">Төлөв засах</h3>

            <select
              value={newStatus}
              onChange={(e) =>
                setNewStatus(e.target.value as "PENDING" | "SHIPPED")
              }
              className="w-full border px-2 py-1 mb-4"
            >
              <option value="PENDING">Хүлээгдэж буй</option>
              <option value="SHIPPED">Хүргэгдсэн</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="admin-button-bordered"
              >
                Болих
              </button>
              <button
                onClick={updateStatus}
                disabled={loading}
                className="admin-button-blue"
              >
                Хадгалах
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;
