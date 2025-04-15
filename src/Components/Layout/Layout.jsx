import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import CodeImage from '../../assets/codeImage.png';

export default function Layout() {
    const location = useLocation();

    // Check if the current route is Login, Register, or Code
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const isCodePage = location.pathname === '/code'; // Assuming your code page's route is '/code'

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className="flex flex-grow mb-24 px-5">
                {/* Main Content Area */}
                <div className="container flex items-center justify-center flex-grow">
                    <Outlet className='z-50'/>
                </div>

                {/* Image on the Right (Only show if not on the "code" page) */}
                {!isCodePage && (
                    <div
                        className={`flex justify-center absolute right-0 items-center transition-all duration-500 ease-in-out ${isLoginPage ? 'w-1/4' : isRegisterPage ? 'w-[40%]' : 'w-1/3'}`}
                    >
                        <img src={CodeImage} alt="Code" className="object-contain max-w-full h-auto z-0" />
                    </div>
                )}
            </div>
        </div>
    );
}
