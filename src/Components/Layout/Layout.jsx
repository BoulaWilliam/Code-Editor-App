import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import CodeImage from '../../assets/codeImage.png';

export default function Layout() {
    const location = useLocation();

    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const isCodePage = location.pathname === '/code';

    return (
        <div className='flex flex-col min-h-screen relative overflow-hidden'>
            <Navbar />
            <div className="flex flex-grow px-5 relative z-10">
                <Outlet className='z-50' />

                {/* Image on the Right (Only show if not on the "code" page) */}
                {!isCodePage && (
                    <div
                        className={`flex justify-center absolute right-0 top-0 bottom-0 items-center transition-all duration-500 ease-in-out ${
                            isLoginPage ? 'w-1/4' : isRegisterPage ? 'w-[40%]' : 'w-1/3'
                        }`}
                    >
                        <img
                            src={CodeImage}
                            alt="Code"
                            className="object-contain max-w-full h-auto z-10"
                        />
                    </div>
                )}
            </div>

            {/* Full height SVG background - hidden on code page */}
            {!isCodePage && (
                <div className="absolute inset-0 z-0">
                    <svg
                        className="h-full w-full object rounded-[20px]"
                        viewBox="0 0 1357 1024"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <path
                            d="M140.58 -466.367L979.979 -327.138C1000.91 -323.672 1022.39 -325.813 1042.22 -333.341C1062.06 -340.87 1079.54 -353.518 1092.9 -369.999L1629.04 -1030.78C1706.73 -1126.44 1860.85 -1057.06 1840.74 -935.477L1701.52 -95.9394C1698.06 -75.0084 1700.2 -53.5328 1707.72 -33.6975C1715.25 -13.8621 1727.9 3.62529 1744.38 16.9855L2405.17 553.119C2500.83 630.811 2431.44 784.933 2309.86 764.826L1470.35 625.547C1449.42 622.081 1427.94 624.222 1408.11 631.75C1388.27 639.279 1370.78 651.927 1357.42 668.408L821.315 1329.14C743.624 1424.79 589.501 1355.41 609.608 1233.83L748.887 394.317C752.353 373.386 750.213 351.911 742.684 332.075C735.156 312.24 722.508 294.753 706.027 281.392L45.241 -254.741C-50.4171 -332.433 18.9668 -486.555 140.548 -466.448"
                            stroke="url(#paint0_linear_2015_185)"
                            strokeWidth="0.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_2015_185"
                                x1="678.788"
                                y1="1362.95"
                                x2="1771.62"
                                y2="-1064.57"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#08AEED" />
                                <stop offset="1" stopColor="#09E190" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            )}
        </div>
    );
}
