import Category from "@/components/Category";

export default function CategoryPage({params}) {
   const slug = params.slug;

  return (
    <div className="flex items-start gap-4">

      {/* Side menu */}
      <aside className="w-64 min-h-screen bg-white p-4 rounded shadow-sm border-gray-200">
        <div className="grid grid-cols-2">
          <Category layout="grid"/>
        </div>
      </aside>

      {/* Product list */}
      <main className="flex-1 grid grid-cols-3 gap-4">
        <div>
          <h3>{slug}</h3>
        </div>
      </main>

    </div>
  );
}
