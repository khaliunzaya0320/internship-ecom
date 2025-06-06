import Order from "@/components/Order";

const OrderPage = () => {
  const orders = [...Array(5).keys()];
  return (

    <div className="m-4">

      <h1 className="primary-header">Миний захиалгууд</h1>

      <div className="flex flex-wrap gap-3"> 
        {orders &&
          orders.map((item, index) => {
            return <Order key={index} />;
        })}
      </div>

    </div>
  );
};

export default OrderPage;
