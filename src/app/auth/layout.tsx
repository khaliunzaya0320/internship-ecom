import { Fragment } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center">
        <main className="bg-white p-8 rounded-sm shadow-md w-full max-w-md">
          
          {children}

        </main>
      </div>
    </Fragment>
  );
  
}
