"use client"

import { useEffect, useState } from 'react'

type User = {
  id: number
  name: string
  email: string
  role: string
  orders: number
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('USER')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await fetch('/api/user')
    const data = await res.json()
    setUsers(data)
  }

  const openModal = (user?: User) => {
    if (user) {
      setEditingUser(user)
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
    } else {
      setEditingUser(null)
      setName('')
      setEmail('')
      setRole('user')
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingUser(null)
    setName('')
    setEmail('')
    setRole('user')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !role) {
      alert('Бүх талбарыг бөглөнө үү')
      return
    }

    const body = JSON.stringify({ name, email, role })

    const url = editingUser ? `/api/user/${editingUser.id}` : '/api/user'
    const method = editingUser ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body,
    })

    if (res.ok) {
      await fetchUsers()
      closeModal()
    } else {
      alert('Хадгалахад алдаа гарлаа')
    }
  }

  const deleteUser = async (userId: number) => {
    if (!confirm('Хэрэглэгчийг устгах уу?')) return
    const res = await fetch(`/api/user/${userId}`, { method: 'DELETE' })
    if (res.ok) fetchUsers()
    else alert('Алдаа гарлаа')
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="secondary-header">Хэрэглэгчийн жагсаалт</h2>
        <button onClick={() => openModal()} className="admin-button-blue">+ Хэрэглэгч нэмэх</button>
      </div>

      <table className="admin-table">
        <thead className="text-left text-xs">
          <tr>
            <th className="px-4 py-2">№</th>
            <th className="px-4 py-2">Нэр</th>
            <th className="px-4 py-2">Имэйл</th>
            <th className="px-4 py-2">Эрх</th>
            <th className="px-4 py-2">Захиалгууд</th>
            <th className="px-4 py-2">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t text-sm">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">{user.orders}</td>
              <td className="px-4 py-2 space-x-2">
                <button onClick={() => openModal(user)} className="text-blue-600 hover:underline">Засах</button>
                <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:underline">Устгах</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">{editingUser ? 'Хэрэглэгч засах' : 'Хэрэглэгч нэмэх'}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Нэр"
                className="border p-2"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Имэйл"
                className="border p-2"
              />
              <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2">
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>


              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={closeModal} className="admin-button-bordered">Болих</button>
                <button type="submit" className="admin-button-blue">Хадгалах</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsersPage
