import React, { useState, useContext, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';
import type { Notification } from '../types';

const icons = {
  // FIX: Replaced 'any' with 'React.SVGProps<SVGSVGElement>' to correctly type the SVG icon props.
  Home: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Showcase: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l4 4m0 0l-4 4m4-4H4m16 5l-4 4m0 0l4 4m-4-4h12" /></svg>,
  Leaderboard: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Resources: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  About: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Bell: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  User: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
};


// FIX: Changed icon prop type to React.ReactElement<any> to solve issue with React.cloneElement inferring props as unknown.
const NavItem: React.FC<{ to: string; label: string; icon: React.ReactElement<any> }> = ({ to, label, icon }) => {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
        isActive
            ? 'bg-highlight/20 text-highlight shadow-lg'
            : 'text-text-secondary hover:bg-white/10 hover:text-text-primary'
        }`;
    return (
        <NavLink to={to} className={navLinkClass}>
            {React.cloneElement(icon, { className: 'h-5 w-5' })}
            <span>{label}</span>
        </NavLink>
    );
};

export const Header: React.FC = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { notifications, setNotifications } = useContext(DataContext);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const userNotifications = notifications
    .filter(n => currentUser && (!n.userId || n.userId === currentUser.id))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  const unreadCount = userNotifications.filter(n => !n.read).length;


  const handleReadNotifications = () => {
    setNotificationsOpen(!isNotificationsOpen);
    if (!isNotificationsOpen && unreadCount > 0) {
      setNotifications(notifications.map(n => ({...n, read: true})));
    }
  }

  const handleLogout = () => {
      logout();
      setProfileOpen(false);
      navigate('/');
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const navItems = [
    { to: "/", label: "Home", icon: <icons.Home /> },
    ...(currentUser ? [{ to: "/showcase", label: "Showcase", icon: <icons.Showcase /> }] : []),
    { to: "/leaderboard", label: "Leaderboard", icon: <icons.Leaderboard /> },
    { to: "/resources", label: "Resources", icon: <icons.Resources /> },
    { to: "/about", label: "About", icon: <icons.About /> },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl mx-auto z-50">
      <div className="glass-effect rounded-xl shadow-lg">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          <div className="flex items-center">
            <NavLink to="/"><img src="https://res.cloudinary.com/dabfeqgsj/image/upload/v1759778648/cyizstrjgcq0w9fr8cxp.png" alt="DCCC Logo" className="h-10 w-auto" /></NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-2">
             {navItems.map(item => <NavItem key={item.to} {...item} />)}
          </div>
          <div className="flex items-center">
            {currentUser ? (
             <>
                <div className="relative" ref={notificationsRef}>
                    <button onClick={handleReadNotifications} className="p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-white/10 transition-colors focus:outline-none">
                        <icons.Bell className="h-6 w-6" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full ring-2 ring-secondary bg-red-500"/>
                        )}
                    </button>
                    {isNotificationsOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-lg glass-effect ring-1 ring-black ring-opacity-5 z-50">
                           <div className="px-4 py-2 text-sm text-text-primary font-bold">Notifications</div>
                           <div className="divide-y divide-gray-600/50">
                               {userNotifications.length > 0 ? userNotifications.slice(0, 5).map((n: Notification) => (
                                   <div key={n.id} className="px-4 py-3 text-sm text-text-secondary hover:bg-white/5">
                                       <p className="text-text-primary">{n.message}</p>
                                       <p className="text-xs mt-1">{n.createdAt.toLocaleDateString()}</p>
                                   </div>
                               )) : <p className="px-4 py-3 text-sm text-text-secondary">No new notifications.</p>}
                           </div>
                        </div>
                    )}
                </div>
                <div className="ml-3 relative" ref={profileRef}>
                  <div>
                    <button onClick={() => setProfileOpen(!isProfileOpen)} className="max-w-xs rounded-full flex items-center text-sm focus:outline-none ring-2 ring-transparent hover:ring-highlight transition-all" id="user-menu" aria-haspopup="true">
                      <span className="sr-only">Open user menu</span>
                      <icons.User className="h-9 w-9 p-1 rounded-full bg-accent text-text-primary" />
                    </button>
                  </div>
                  {isProfileOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 glass-effect ring-1 ring-black ring-opacity-5 z-50">
                      <div className="px-4 py-2 text-sm text-text-primary border-b border-gray-600/50">
                        <p className="font-semibold">{currentUser?.name}</p>
                        <p className="text-xs text-text-secondary">{currentUser?.role}</p>
                      </div>
                      <NavLink to="/profile" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-text-secondary hover:bg-white/10 hover:text-text-primary">Your Profile</NavLink>
                      {currentUser?.role === 'Admin' && <NavLink to="/admin" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-text-secondary hover:bg-white/10 hover:text-text-primary">Admin Panel</NavLink>}
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-white/10 hover:text-text-primary">Sign out</button>
                    </div>
                  )}
                </div>
             </>
            ) : (
                <div className="flex items-center space-x-2">
                    <NavLink to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:bg-accent hover:text-text-primary transition-colors">Login</NavLink>
                    <NavLink to="/register" className="px-4 py-2 rounded-md text-sm font-medium bg-highlight text-primary hover:bg-amber-300 transition-colors shadow-[0_0_15px_rgba(251,191,36,0.4)]">Register</NavLink>
                </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};