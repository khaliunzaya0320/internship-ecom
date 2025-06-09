'use client'

const adminData = {
  name: "Болороо",
  email: "bolor@gmail.com",
  role: "Админ",
  createdAt: "2025-06-09"
};

const AdminProfilePage = () => {
  return (
    <div className="p-6 max-w-xl bg-white shadow rounded-md">
      <h2 className="secondary-header mb-4">Админы мэдээлэл</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between border-b py-2">
          <span className="font-semibold text-gray-600">Нэр:</span>
          <span>{adminData.name}</span>
        </div>

        <div className="flex justify-between border-b py-2">
          <span className="font-semibold text-gray-600">И-мэйл:</span>
          <span>{adminData.email}</span>
        </div>

        <div className="flex justify-between border-b py-2">
          <span className="font-semibold text-gray-600">Эрх:</span>
          <span>{adminData.role}</span>
        </div>

        <div className="flex justify-between border-b py-2">
          <span className="font-semibold text-gray-600">Бүртгүүлсэн огноо:</span>
          <span>{adminData.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
