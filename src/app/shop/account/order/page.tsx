"use client"

import { useEffect, useState } from "react";
import Order from "@/components/Order";

const OrderPage = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/order');
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Order fetch error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="m-4">
      <h1 className="primary-header">Миний захиалгууд</h1>
      <div className="flex gap-3 w-full">
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
