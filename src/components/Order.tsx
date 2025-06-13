import React from 'react';

interface OrderProps {
  order: {
    id: number;
    user: string,
    createdAt: string;
    status: string;
    totalAmount: number;
  };
}

const Order: React.FC<OrderProps> = ({ order }) => {
  const date = new Date(order.createdAt).toLocaleString();

  return(
    <div className="flex justify-between items-center rounded-xl h-20 p-4 gap-80 shadow-sm  bg-white">
      
        <div className="order-id">
          <h5 className="text-sm">Захиалгын дугаар</h5>
          <p>{order.id}</p>
        </div>

        {/* <div className="order-id">
          <h5 className="text-sm">Захиалагч</h5>
          <p>{order.user}</p>
        </div> */}

        <div className="order-status">
          <h5 className="text-sm">{order.createdAt}</h5>
          <p>{order.status}</p>
        </div>

        <div className="order-price text-right">
          <h5 className="text-sm">Дүн</h5>
          <p>{order.totalAmount}</p>
        </div>

    </div>
  )
}

export default Order;