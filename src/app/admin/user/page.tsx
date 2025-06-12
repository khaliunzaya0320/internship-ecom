'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type User = { 
  id: number
  name: string
  email: string
  role: string
  orders: number 
}

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/user') 
      const data = await res.json()
      setUsers(data)
    }

    fetchUsers()
  }, [])

  
  return (
    <div className="p-4">
      <h2 className="secondary-header mb-4">Хэрэглэгчийн жагсаалт</h2>

      <div className="overflow-x-auto bg-white shadow rounded-md">
        <table className="min-w-full table-auto">
          <thead className="bg-white text-gray-700 text-left text-xs">
            <tr>
              <th className="px-4 py-2">Нэр</th>
              <th className="px-4 py-2">Имэйл</th>
              <th className="px-4 py-2">Эрх</th>
              <th className="px-4 py-2">Захиалгууд</th>
              <th className="px-4 py-2">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t text-sm">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{user.orders}</td>
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/users/edit/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Засах
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUsersPage
