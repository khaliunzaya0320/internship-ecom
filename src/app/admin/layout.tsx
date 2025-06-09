import AdminMenu from "@/components/AdminMenu";
import AdminHeader from "@/components/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Admin Sidebar */}
      <aside className="w-56">
        <AdminMenu />
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="p-4">{children}</div>
      </main>
      
    </div>
  );
}

