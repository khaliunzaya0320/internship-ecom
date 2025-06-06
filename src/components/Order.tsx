const Order = () =>{
  return(
    <div className="flex justify-between items-center bg-white rounded-xl h-20 w-full p-4 shadow-sm">
      
        <div className="order-id">
          <h5 className="text-sm">Захиалгын дугаар</h5>
          <p>O-1234</p>
        </div>

        <div className="order-status">
          <h5 className="text-sm">2025/06/06 15:10</h5>
          <p>Захиалга амжилттай хүргэгдсэн</p>
        </div>

        <div className="order-price text-right">
          <h5 className="text-sm">Дүн</h5>
          <p>1000</p>
        </div>

    </div>
  )
}

export default Order;