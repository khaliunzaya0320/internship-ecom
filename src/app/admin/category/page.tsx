"use client"
import { useState, useEffect } from 'react'

type Category = { 
  id: number
  name: string 
}

const AdminCategory = () => {

  const [categories, setCategories] = useState<Category[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [nameInput, setNameInput] = useState('')

  
  const fetchCategories = async () => {
    const res = await fetch('/api/category')
    setCategories(await res.json())
  }
  useEffect(() => { fetchCategories() }, [])

  const openModal = (cat?: Category) => {
    setEditing(cat ?? null)
    setNameInput(cat?.name ?? '')
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const body = JSON.stringify({ name: nameInput })
    const url = editing ? `/api/category/${editing.id}` : '/api/category'
    const method = editing ? 'PUT' : 'POST'

    const res = await fetch(url, { method, headers:{'Content-Type':'application/json'}, body })
    if (res.ok) {
      setShowModal(false); setEditing(null); fetchCategories()
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Ангиллыг устгах уу?')) return
    const res = await fetch(`/api/category/${id}`, { method: 'DELETE' })
    if (res.ok) fetchCategories()
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="secondary-header">Ангиллын жагсаалт</h2>
        <button onClick={() => openModal()} className="admin-button-blue">+ Ангилал нэмэх</button>
      </div>

      <div className="">
        <table className="admin-table">
          <thead className="text-xs text-left">
            <tr>
              <th className="px-4 py-2 w-16">№</th>
              <th className="px-4 py-2">Нэр</th>
              <th className="px-4 py-2 w-44">Үйлдэл</th>
            </tr>
          </thead>
          
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={cat.id} className="border-t">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{cat.name}</td>
                <td className="px-4 py-2 space-x-4">
                  <button onClick={() => openModal(cat)} className="text-blue-600">Засах</button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-600">Устгах</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-md shadow p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">{editing ? 'Ангилал засах' : 'Ангилал нэмэх'}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Нэр"
                className="border rounded w-full px-3 py-2 mb-4"
                required />
              <div className="flex justify-end gap-2">
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

export default AdminCategory
