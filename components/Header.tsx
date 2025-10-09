import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Role } from '../types';

const NavItem: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <NavLink 
        to={to} 
        className={({ isActive }) => 
            `px-3 py-2 rounded-md text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-highlight after:transition-all after:duration-300 hover:after:w-1/2 hover:after:left-1/4 ${
                isActive ? 'text-white after:w-1/2 after:left-1/4' : 'text-text-secondary hover:text-white'
            }`
        }
    >
        {children}
    </NavLink>
);

export const Header: React.FC = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-accent/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
                            <img className="h-12 w-auto" src="https://res.cloudinary.com/dabfeqgsj/image/upload/v1759778648/cyizstrjgcq0w9fr8cxp.png" alt="DCCC Logo" />
                            <span className="font-bold text-white text-xl">DCCC</span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavItem to="/">Showcase</NavItem>
                                <NavItem to="/activities">Activities</NavItem>
                                <NavItem to="/leaderboard">Leaderboard</NavItem>
                                <NavItem to="/members">Members</NavItem>
                                <NavItem to="/events">Events</NavItem>
                                <NavItem to="/about">About</NavItem>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {currentUser ? (
                                <>
                                    <Link to="/showcase" className="btn btn-highlight mr-4">
                                        Showcase Talent
                                    </Link>
                                    {currentUser.role === Role.ADMIN && (
                                        <Link to="/admin" className="mr-4 px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-white hover:bg-accent/50">
                                            Admin
                                        </Link>
                                    )}
                                    <Link to="/profile" className="mr-4 px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-white hover:bg-accent/50">
                                        Profile
                                    </Link>
                                    <button onClick={logout} className="btn btn-danger">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="space-x-2">
                                    <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:bg-accent/50 hover:text-white">
                                        Login
                                    </Link>
                                    <Link to="/register" className="btn btn-highlight">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setMenuOpen(!isMenuOpen)} className="bg-accent/50 inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-white hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavItem to="/">Showcase</NavItem>
                        <NavItem to="/activities">Activities</NavItem>
                        <NavItem to="/leaderboard">Leaderboard</NavItem>
                        <NavItem to="/members">Members</NavItem>
                        <NavItem to="/events">Events</NavItem>
                        <NavItem to="/about">About</NavItem>
                    </div>
                     <div className="pt-4 pb-3 border-t border-accent/50">
                        {currentUser ? (
                            <div className="px-5">
                                <div className="text-base font-medium leading-none text-white">{currentUser.name}</div>
                                <div className="text-sm font-medium leading-none text-text-secondary">{currentUser.email}</div>
                                <div className="mt-3 space-y-1">
                                    <Link to="/showcase" className="block w-full text-left bg-highlight text-primary px-3 py-2 rounded-md text-base font-medium hover:bg-amber-300">Showcase Talent</Link>
                                    <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-white hover:bg-accent/50">Your Profile</Link>
                                    {currentUser.role === Role.ADMIN && (
                                       <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-white hover:bg-accent/50">Admin Dashboard</Link>
                                    )}
                                    <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-white hover:bg-accent/50">
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="px-2 space-y-2">
                                <Link to="/login" className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-white hover:bg-accent/50">Login</Link>
                                <Link to="/register" className="block w-full text-left bg-highlight text-primary px-3 py-2 rounded-md text-base font-medium hover:bg-amber-300">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;