'use client'

import Link from 'next/link'

type User = {
  id: string
  name: string
  email: string
  password: string
  role: string
  orders: string
}

const testUsers: User[] = [
  {
    id: 'U001',
    name: 'Болор',
    email: 'bolor@gmail.com',
    password: '********',
    role: 'user',
    orders: '2',
  },
  {
    id: 'U002',
    name: 'Od',
    email: 'od@com',
    password: '********',
    role: 'user',
    orders: '4',
  },
]

const AdminUsersPage = () => {
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
            {testUsers.map((user) => (
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
