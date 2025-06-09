export default function AdminProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  
  return (
    <div>
      
      <div className="">
        {children}
      </div>
      
    </div>
  );
}