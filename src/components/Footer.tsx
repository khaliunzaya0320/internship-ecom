import Link from 'next/link';
import Image from 'next/image';
// Lucide React-аас иконуудыг импортлох. Хэрэв суулгаагүй бол суулгах хэрэгтэй.
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'; 

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                
                <div className="flex flex-col items-start md:col-span-1">
                    <Link href="#" className="text-3xl font-extrabold text-white mb-4">
                        E-Commerce
                    </Link>
                    <p className="text-sm text-gray-400">
                        Веб үйлчилгээ
                    </p>
                </div>

                <div className="flex flex-col md:col-span-1">
                    <h3 className="font-semibold text-white text-lg mb-4">Холбоо барих</h3>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                        <Mail className="w-4 h-4 mr-2 text-rose-500" />
                        <span>e@commerce.mn</span>
                    </div>
                    {/* Нэмэлт холбоо барих мэдээлэл (утас, хаяг) */}
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                        <Phone className="w-4 h-4 mr-2 text-rose-500" />
                        <span>+976 1234-5678</span>
                    </div>
                    <div className="flex items-start text-sm text-gray-400">
                        <MapPin className="w-4 h-4 mr-2 text-rose-500 flex-shrink-0 mt-0.5" />
                        <span>Улаанбаатар хот</span>
                    </div>
                </div>

                <div className="flex flex-col md:col-span-1">
                    <h3 className="font-semibold text-white text-lg mb-4">Тусламж</h3>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white mb-2 transition-colors duration-200">
                        Үйлчилгээний нөхцөл
                    </Link>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white mb-2 transition-colors duration-200">
                        Нууцлалын бодлого
                    </Link>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white mb-2 transition-colors duration-200">
                        Түгээмэл асуултууд (FAQ)
                    </Link>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white mb-2 transition-colors duration-200">
                        Хүргэлт ба буцаалт
                    </Link>
                </div>

                <div className="flex flex-col md:col-span-1">
                    <h3 className="font-semibold text-white text-lg mb-4">Бидэнтэй холбогдох</h3>
                    <div className="flex gap-4">
                        <a href="#" target="_blank" rel="noopener noreferrer" 
                           className="text-gray-400 hover:text-white transition-colors duration-200">
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" 
                           className="text-gray-400 hover:text-white transition-colors duration-200">
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" 
                           className="text-gray-400 hover:text-white transition-colors duration-200">
                            <Twitter className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500">
                &copy; {currentYear} E-Commerce. Бүх эрх хуулиар хамгаалагдсан.
            </div>
        </footer>
    );
};

export default Footer;