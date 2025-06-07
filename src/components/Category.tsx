import Image from "next/image";
import Link  from "next/link";
import { Smartphone, Baby, Gamepad2, BookOpen, Brush, HeartPulse, Home, Dumbbell, User, } from "lucide-react";


const categories = [
  
  {name: "Эмэгтэй", icon:<User size={40}/>},
  {name: "Эрэгтэй", icon:<User size={40}/>},
  {name: "Хүүхдийн", icon:<Baby size={40}/>},
  {name: "Технологи", icon:<Smartphone size={40}/>},
  {name: "Спорт", icon:<Dumbbell size={40}/>},
  {name: "Гэр ахуй", icon:<Home size={40}/>},
  {name: "Эрүүл мэнд", icon:<HeartPulse size={40}/>},
  {name: "Гоо сайхан", icon:<Brush size={40}/>},
  {name: "Бичиг хэрэг", icon:<BookOpen size={40}/>},
  {name: "Тоглоом", icon:<Gamepad2 size={40}/>},
]

const Category = () => {
  return (
    <>
      {categories.map((cat, index) => (
        <Link key={index} href="#" className="min-w-[100px]">
          <div className="w-24 h-28 flex flex-col items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-md">
            <div className="text-primary">{cat.icon}</div>
            <h2 className="text-sm text-center mt-2">{cat.name}</h2>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Category;