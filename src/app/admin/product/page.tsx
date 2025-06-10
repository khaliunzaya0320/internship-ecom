'use client'

import { useState } from 'react'
import Link from 'next/link'

type Product = {
  id: string
  name: string
  category: string
  description: string
  price: number
  stock: number
  imageUrl: string
  createdAt: string
  updatedAt: string
}

const testdata = [
  {
    id: "P001",
    name: "Cream",
    category: "Гоо сайхан",
    description: "",
    price: 1000,
    stock: 10,
    imageUrl: "https...",
    createdAt: "2025/06/09",
    updatedAt: ""
  },
  {
    id: "P002",
    name: "Cream",
    category: "Гоо сайхан",
    description: "",
    price: 1000,
    stock: 10,
    imageUrl: "https...",
    createdAt: "2025/06/09",
    updatedAt: ""
  },
  {
    id: "P003",
    name: "Cream",
    category: "Гоо сайхан",
    description: "Cream",
    price: 1000,
    stock: 10,
    imageUrl: "https...",
    createdAt: "2025/06/09",
    updatedAt: ""
  },
]



const AdminProductPage = () => {

  const [product] = useState<Product[]>(testdata)

  return (
    <div className="p-4">
      <div className="flex justify-between mb-6">
      <h2 className="secondary-header">Бүтээгдэхүүний жагсаалт</h2>
        <Link
          href="/admin/product/add"
          className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600"
        >
          Шинээр үүсгэх
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow">
        <table className="min-w-full table-auto justify-between">

          <thead>
            <tr className="bg-white text-gray-700 text-left text-xs">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Нэр</th>
              <th className="px-4 py-2">Ангилал</th>
              <th className="px-4 py-2">Тайлбар</th>
              <th className="px-4 py-2">Үнэ</th>
              <th className="px-4 py-2">Нөөц</th>
              <th className="px-4 py-2">Зураг</th>
              <th className="px-4 py-2">Огноо</th>
              <th className="px-4 py-2">Засах/Устгах</th>
            </tr>
          </thead>

          <tbody>
          {product.map((p) => (
              <tr key={p.id} className="border-t ">
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2">{p.description}</td>
                <td className="px-4 py-2">{p.price}₮</td>
                <td className="px-4 py-2">{p.stock}</td>
                <td className="px-4 py-2">
                  <img src={p.imageUrl} alt={p.name} />
                </td>
                <td className="px-4 py-2">{p.createdAt}</td>
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/product/edit/${p.id}`}
                    className="text-blue-700 pr-4"
                  >
                    Засах
                  </Link>
                  <button className="text-red-700 ">Устгах
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default AdminProductPage;
