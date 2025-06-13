import Header from '@/components/Header';

export default function OrderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            <Header />
            {children}
        </div>
    );
}
