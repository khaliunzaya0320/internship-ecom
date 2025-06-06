import Menu from "./Menu";
import Link from "next/link";
import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <header className="bg-white shadow h-16 flex items-center justify-between px-4 sm:px-8">
      
      <div className="text-lg font-bold text-gray-700">
        <Link href="/">E-Commerce</Link>
      </div>
      
      <SearchBar/>
      <Menu />
      
    </header>
  );
};

export default NavBar;
