"use client"

import { useState, useEffect } from 'react'
import { Category } from '@/generated/prisma'


type Product = {
  id: number
  name: string
  category: Category
  description: string
  price: number
  stock: number
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}


const AdminProductPage = () => {

  const [product, setProduct] = useState<Product[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined)
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<number | ''>('')
  const [stock, setStock] = useState<number | ''>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [nameInput, setNameInput] = useState<string>('')
  const [categories, setCategories] = useState<Category[]>([])

  const fetchProduct = async () => {
    const res = await fetch('/api/product')
    setProduct(await res.json())
  }
  useEffect(() =>{fetchProduct()}, [])

  const fetchCategories = async () => {
    const res = await fetch('/api/category')
    const data = await res.json()
    setCategories(data)
  }
  
  useEffect(() => {
    fetchCategories()
  }, [])
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!nameInput || !selectedCategory || price === '' || stock === '' || !imageUrl) {
      alert("Бүх талбарыг бөглөнө үү")
      return
    }
  
    const body = JSON.stringify({
      name: nameInput,
      categoryId: selectedCategory.id,
      description,
      price,
      stock,
      imageUrl
    })
  
    const url = editing ? `/api/product/${editing.id}` : '/api/product'
    const method = editing ? 'PUT' : 'POST'
  
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body
    })
  
      setShowModal(false)
      setEditing(null)
      fetchProduct()
  }
  

  const handleDelete = async (id: number) => {
    if (!confirm("Бүтээгдэхүүнийг устгах уу?")) return
    const res = await fetch(`/api/product/${id}`, { method: 'DELETE' })
    if (res.ok) fetchProduct()
  }

  const openModal = (prod?: Product) => {
    setEditing(prod ?? null)
    setNameInput(prod?.name ?? '')
    setShowModal(true)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="secondary-header">Бүтээгдэхүүний жагсаалт</h2>
        <button onClick={() => openModal()}className="admin-button-blue">+ Бүтээгдэхүүн нэмэх
        </button>
      </div>

      <div className="">
        <table className="admin-table">
          <thead className=''>
            <tr className="text-xs text-left">
              <th className="px-2 py-2 ">№</th>
              <th className="px-2 py-2">Нэр</th>
              <th className="px-2 py-2">Ангилал</th>
              <th className="px-2 py-2">Тайлбар</th>
              <th className="px-2 py-2">Үнэ</th>
              <th className="px-2 py-2">Нөөц</th>
              <th className="px-2 py-2 ">Зургийн URL</th>
              <th className="px-2 py-2 ">Огноо</th>
              <th className="px-2 py-2 w-28">Үйлдэл</th>
            </tr>
          </thead>

          <tbody>
            {product.map((p, idx) => (
              <tr key={p.id} className="border-t text-xs">
                <td className="px-2 py-2">{idx + 1}</td>
                <td className="px-2 py-2">{p.name}</td>
                <td className="px-2 py-2">{p.category?.name}</td>
                <td className="px-2 py-2">{p.description}</td>
                <td className="px-2 py-2">{p.price}₮</td>
                <td className="px-2 py-2">{p.stock}</td>
                <td className="px-2 py-2 ">{p.imageUrl}</td>
                <td className="px-2 py-2">{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className="px-2 py-2 space-x-2">
                <button onClick={() => openModal(p)} className="text-blue-600 text-sm hover:underline">Засах</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-600 text-sm hover:underline">Устгах</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="flex flex-col bg-white rounded-md shadow p-6 w-2/3">
            <h3 className="text-lg font-semibold mb-4">{editing ? 'Бүтээгдэхүүн засах' : 'Бүтээгдэхүүн нэмэх'}</h3>

            <form onSubmit={handleSubmit} className='flex flex-col'>
              <input value={nameInput} onChange={e => setNameInput(e.target.value)} placeholder="Нэр" className='border p-2 mt-2'/>
              <select
                value={selectedCategory?.id ?? ""}
                onChange={(e) => {
                  const selected = categories.find(cat => cat.id === Number(e.target.value))
                  setSelectedCategory(selected)
                }}
                className='border p-2 mt-2'
              >
                <option value="">Ангилал сонгох</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Тайлбар" className='border p-2 mt-2'/>

              <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Үнэ" className='border p-2 mt-2'/>

              <input type="number" value={stock} onChange={e => setStock(Number(e.target.value))} placeholder="Нөөц" className='border p-2 mt-2'/>

              <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Зургийн URL" className='border p-2 mt-2'/>

              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="admin-button-bordered">Болих</button>
                <button type="submit" className="admin-button-blue">Хадгалах</button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}

export default AdminProductPage;
