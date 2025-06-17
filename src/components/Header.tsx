import Menu from './Menu';
import Link from 'next/link';
import SearchBar from './SearchBar';

const Header = () => {
    return (
        <div className="sticky top-0 z-50 bg-gray-800 shadow p-2 flex items-center justify-between px-4 sm:px-8 ">
            <div className="text-lg font-bold text-white">
                <Link href="/">E-Commerce</Link>
            </div>

            <SearchBar />
            <Menu />
        </div>
    );
};

export default Header;
