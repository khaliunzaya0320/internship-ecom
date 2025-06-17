'use client'; 

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer
        closeOnClick= {true}
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        draggable={true}
        pauseOnHover={true}
      />
    </>
  );
}