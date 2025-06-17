import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <div className='flex-grow'>
                    <Header />
                    {children}
                </div>
                <Footer />                
            </div>
        </div>
    );
}
