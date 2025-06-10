'use client'

import Profile from "@/components/Profile";

const adminData = {
  name: "admin",
  email: "admin@gmail.com",
  createdAt: "2025-06-09"
};

const AdminProfilePage = () => {
  return (
    <div className="p-6 max-w-xl">

      <h2 className="secondary-header mb-4">Админы мэдээлэл</h2>
      <Profile/>
      
    </div>
  );
};

export default AdminProfilePage;
