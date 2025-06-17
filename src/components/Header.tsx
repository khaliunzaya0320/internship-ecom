import Link from 'next/link';
import Menu from './Menu';
import MobileMenu from './MobileMenu'
import SearchBar from './SearchBar';

const Header = () => {
    return (
        <div className="sticky top-0 z-50 bg-gray-800 shadow p-2 flex items-center justify-between px-4 sm:px-8 ">
            <div className="text-lg font-bold text-white flex-shrink-0">
                <Link href="/">E-Commerce</Link>
            </div>
            <div className="hidden sm:block flex-grow max-w-xl mx-4">
                <SearchBar />
            </div>
            <div className="hidden md:flex items-center gap-6">
                <Menu />
            </div>
            <div className="md:hidden flex items-center">
                <div className="block sm:hidden mr-2">
                    <SearchBar />
                </div>
                <MobileMenu />
            </div>
        </div>
    );
};

export default Header;
