import React, { useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { userContext } from '../../Contexts/UserContext/User.context';
import Logo from '../../assets/Logo.png';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { token, logOut } = useContext(userContext);
    const location = useLocation();

    const isActivePath = (path) => location.pathname === path;

    // For nav links like "Read Shared"
    const navLinkClass = ({ isActive }) =>
        `relative before:absolute before:left-0 before:-bottom-1 before:h-0.5 before:w-0 hover:before:w-full 
        before:transition-all before:duration-300 before:bg-gradient-to-r before:from-[#08AEED] before:to-[#09E190] 
        hover:shadow-md transition duration-300
        ${isActive ? 'before:!w-full font-semibold' : ''}`;

    // For button links: gradient border using wrapper div
    const GradientButton = ({ to, children, onClick }) => {
        const active = isActivePath(to);
        return (
            <NavLink to={to} onClick={onClick}>
                <div className="p-[2px] rounded-[12px] bg-gradient-to-r from-[#08AEED] to-[#09E190] hover:shadow-md transition">
                    <div className={`px-6 py-2 rounded-[8px] text-white font-semibold
                        ${active ? 'bg-gradient-to-r from-[#08AEED] to-[#09E190]' : 'bg-[#3E3E3E]'}`}>
                        {children}
                    </div>
                </div>
            </NavLink>
        );
    };

    // For logout (button, not NavLink)
    const LogoutButton = () => (
        <div className="p-[2px] rounded-[10px] bg-gradient-to-r from-[#08AEED] to-[#09E190] hover:shadow-md transition">
            <button
                onClick={logOut}
                className="px-4 py-2 rounded-[8px] text-white font-semibold bg-[#3E3E3E]"
            >
                Logout
            </button>
        </div>
    );

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 text-white bg-[#3E3E3E] shadow-md transition-all duration-300 ${isMenuOpen ? 'h-auto' : 'h-20'}`}>
                <div className='flex justify-between items-center px-8 md:px-32'>
                    {/* Logo */}
                    <NavLink to="/home" className="flex items-center justify-between">
                        <img src={Logo} className='w-[80px] object-cover' alt="Logo" />
                        <h1 className="text-xl font-bold ml-2 bg-gradient-to-r from-[#08AEED] to-[#09E190] bg-clip-text text-transparent">
                            CodeFlow
                        </h1>
                    </NavLink>

                    {/* Desktop Menu */}
                    <ul className='hidden xl:flex items-center gap-8 font-semibold text-base'>
                        {!token ? (
                            <>
                                <li><GradientButton to="/login">Signin</GradientButton></li>
                                <li><GradientButton to="/register">Register</GradientButton></li>
                                <li><NavLink className={navLinkClass} to="/ReadShared">Read Shared</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink className={navLinkClass} to="/CreateFile">Created Files</NavLink></li>
                                <li><NavLink className={navLinkClass} to="/bot">Chatbot</NavLink></li>
                                <li><NavLink className={navLinkClass} to="/ReadFiles">My Files</NavLink></li>
                                <li><NavLink className={navLinkClass} to="/ReadShared">Read Shared</NavLink></li>
                                <li><NavLink className={navLinkClass} to="/code">Code Editor</NavLink></li>
                                <li><LogoutButton /></li>
                            </>
                        )}
                    </ul>

                    {/* Toggle Mobile */}
                    <button className="lg:hidden block text-[#09E190] text-[24px]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`xl:hidden w-full text-white bg-[#3E3E3E] flex flex-col items-center gap-6 font-semibold text-lg 
                    transition-all duration-300 overflow-hidden ${isMenuOpen ? 'h-auto opacity-100 py-6' : 'h-0 opacity-0'}`}>
                    <ul className='w-full flex flex-col items-center gap-6'>
                        {!token ? (
                            <>
                                <li><GradientButton to="/login" onClick={() => setIsMenuOpen(false)}>Signin</GradientButton></li>
                                <li><GradientButton to="/register" onClick={() => setIsMenuOpen(false)}>Register</GradientButton></li>
                                <li><NavLink onClick={() => setIsMenuOpen(false)} className={navLinkClass} to="/ReadShared">Read Shared</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink onClick={() => setIsMenuOpen(false)} className={navLinkClass} to="/CreateFile">Created Files</NavLink></li>
                                <li><NavLink onClick={() => setIsMenuOpen(false)} className={navLinkClass} to="/bot">Chatbot</NavLink></li>
                                <li><NavLink onClick={() => setIsMenuOpen(false)} className={navLinkClass} to="/ReadFiles">Read Files</NavLink></li>
                                <li><NavLink onClick={() => setIsMenuOpen(false)} className={navLinkClass} to="/ReadShared">Read Shared</NavLink></li>
                                <li><NavLink onClick={() => setIsMenuOpen(false)} className={navLinkClass} to="/code">Code Editor</NavLink></li>
                                <li>
                                    <div className="p-[2px] rounded-[10px] bg-gradient-to-r from-[#08AEED] to-[#09E190] hover:shadow-md transition">
                                        <button
                                            onClick={() => { setIsMenuOpen(false); logOut(); }}
                                            className="px-4 py-2 rounded-[8px] text-white font-semibold bg-[#3E3E3E]"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>

            {/* Space below navbar */}
            <div className={`transition-all duration-300 ${isMenuOpen ? 'mt-56' : 'mt-20'}`}></div>
        </>
    );
}
