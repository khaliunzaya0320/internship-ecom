import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className="bg-white h-48 flex justify-between p-8 ">
            <Link href="/" className="text-xl font-bold text-gray-800">
                E-Commerce
            </Link>
            {/* Left */}
            <div className="">
                <div className="font-semibold">Холбоо барих</div>
                <span className="font-thin">order@ecommerce.mn</span>
            </div>

            {/* Right */}
            <div className="w-1/2 gap-4">
                <div className="font-semibold flex flex-col">
                    Тусламж
                    <Link href="/" className="font-thin">
                        Үйлчилгээний нөхцөл
                    </Link>
                    <Link href="/" className="font-thin">
                        Үйлчилгээний нөхцөл
                    </Link>
                </div>

                <div className="font-semibold mt-2">
                    Холбоосууд
                    <div className="flex gap-4 mt-2">
                        <Image
                            src="/facebook.png"
                            alt=""
                            width={16}
                            height={16}
                        />
                        <Image
                            src="/instagram.png"
                            alt=""
                            width={24}
                            height={24}
                        />
                        <Image
                            src="/twitter.png"
                            alt=""
                            width={16}
                            height={16}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
