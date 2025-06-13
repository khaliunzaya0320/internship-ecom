import Image from "next/image";
import Link  from "next/link";
import { Smartphone, Baby, Gamepad2, BookOpen, Brush, HeartPulse, Home, Dumbbell, User, Gem, EggFried, Plug, } from "lucide-react";


const categories = [
  
  {name: "Эмэгтэй", slug:"women", icon:<User size={40}/>},
  {name: "Эрэгтэй", slug:"men", icon:<User size={40}/>},
  {name: "Хүүхдийн", slug:"kids", icon:<Baby size={40}/>},
  {name: "Технологи", slug:"technology", icon:<Smartphone size={40}/>},
  {name: "Спорт", slug:"sport", icon:<Dumbbell size={40}/>},
  {name: "Гоёл чимэглэл", slug:"jewelry", icon:<Gem size={40}/>},
  {name: "Гэр ахуй", slug:"home", icon:<Home size={40}/>},
  {name: "Хүнс", slug:"food", icon:<EggFried size={40}/>},
  {name: "Цахилгаан хэрэгсэл", slug:"electronics", icon:<Plug size={40}/>},
  {name: "Эрүүл мэнд", slug:"health", icon:<HeartPulse size={40}/>},
  {name: "Гоо сайхан", slug:"beauty", icon:<Brush size={40}/>},
  {name: "Бичиг хэрэг", slug:"stationary", icon:<BookOpen size={40}/>},
  {name: "Тоглоом", slug:"game", icon:<Gamepad2 size={40}/>},
]

interface CategoryProps {
  layout?: 'row' | 'grid';
}

const Category = ({ layout = 'row' }: CategoryProps) => {
  const containerClass =
    layout === 'grid'
      ? 'grid grid-cols-2 gap-y-2 gap-x-28'
      : 'flex gap-4';

  return (
    <div className={containerClass} >
      {categories.map((cat, index) => (
        <Link
          key={index}
          href={`/shop/category/${cat.name}`}
          className="w-full"
        >
          <div className="h-28 w-24 flex flex-col items-center justify-center bg-white borderrounded-xl shadow-sm hover:shadow-md hover:text-rose-500">
            <div className="text-primary">{cat.icon}</div>
            <h2 className="text-sm text-center mt-2">{cat.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Category;
