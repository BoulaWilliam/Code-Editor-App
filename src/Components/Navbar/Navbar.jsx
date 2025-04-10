import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { userContext } from '../../Contexts/UserContext/User.context';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { token, logOut } = useContext(userContext);

    const navLinkClass = ({ isActive }) =>
        `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 
        before:bg-pink-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold' : ''}`;

    return (
        <>
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 w-full z-50 text-white bg-slate-900 shadow-md transition-all duration-300 ${isMenuOpen ? 'h-auto' : 'h-20'}`}>
                <div className='flex justify-between items-center py-6 px-8 md:px-32'>
                    {/* Logo */}
                    <NavLink to="/code" className="flex items-center justify-between">
                        <h1 className='text-xl font-bold ml-2'>CodeAPP</h1>
                    </NavLink>

                    {/* Desktop Menu */}
                    <ul className='hidden xl:flex items-center gap-12 font-semibold text-base'>
                        {!token ? (
                            <>
                                <li><NavLink className={navLinkClass} to="/login"> Login</NavLink></li>
                                <li><NavLink className={navLinkClass} to="/register">Register</NavLink></li>
                                <li><NavLink className={navLinkClass} to="/ReadShared">Read Shared</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink className={navLinkClass} to="/CreateFile">Created Files</NavLink></li>
                                <li><NavLink className={navLinkClass} to="/ReadFiles">Read Files</NavLink></li>
                                <li><NavLink className={navLinkClass} to="/ReadShared">Read Shared</NavLink></li>
                                <li><NavLink className={navLinkClass} to="/code">Code Editor</NavLink></li>
                                <li>
                                    <button onClick={logOut} className="text-red-500 hover:underline font-semibold">
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Toggler Button */}
                    <button className="lg:hidden block text-pink-600 text-xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`xl:hidden w-full text-white bg-slate-900 flex flex-col items-center gap-6 font-semibold text-lg 
                    transition-all duration-300 overflow-hidden ${isMenuOpen ? 'h-auto opacity-100 py-6' : 'h-0 opacity-0'}`}>
                    <ul className='w-full flex flex-col items-center gap-6'>
                        {!token ? (
                            <>
                                <li><NavLink onClick={() => setIsMenuOpen(false)} className={navLinkClass} to="/login"> Login</NavLink></li>
                                <li><NavLink onClick={() => setIsMenuOpen(false)} className={navLinkClass} to="/register">Register</NavLink></li>
                                <li><NavLink onClick={() => setIsMenuOpen(false)} className={navLinkClass} to="/ReadShared">Read Shared</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink onClick={() => setIsMenuOpen(false)} className={navLinkClass} to="/CreateFile">Created Files</NavLink></li>
                                <li><NavLink onClick={() => setIsMenuOpen(false)} className={navLinkClass} to="/ReadFiles">Read Files</NavLink></li>
                                <li><NavLink onClick={() => setIsMenuOpen(false)} className={navLinkClass} to="/ReadShared">Read Shared</NavLink></li>
                                <li><NavLink onClick={() => setIsMenuOpen(false)} className={navLinkClass} to="/code">Code Editor</NavLink></li>
                                <li>
                                    <button onClick={() => { setIsMenuOpen(false); logOut(); }} className="text-red-500 hover:underline font-semibold">
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>

            {/* Content Below Navbar */}
            <div className={`transition-all duration-300 ${isMenuOpen ? 'mt-56' : 'mt-20'}`}></div>
        </>
    );
}
