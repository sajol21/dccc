import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

const navItems = [
    { to: 'overview', label: 'Overview' },
    { to: 'submissions', label: 'Submissions' },
    { to: 'users', label: 'Users' },
    { to: 'events', label: 'Events' },
    { to: 'activities', label: 'Activities' },
    { to: 'settings', label: 'Site Settings' },
    { to: 'announcements', label: 'Announcements' },
];

const AdminLayout: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-primary text-text-primary">
            <aside className="w-64 bg-secondary p-4 flex flex-col border-r border-accent/50">
                <header className="flex-shrink-0 flex items-center space-x-2 mb-8 px-2">
                    <img className="h-10 w-auto" src="https://res.cloudinary.com/dabfeqgsj/image/upload/v1759778648/cyizstrjgcq0w9fr8cxp.png" alt="DCCC Logo" />
                    <span className="font-bold text-white text-lg">DCCC Admin</span>
                </header>
                <nav className="flex flex-col space-y-2">
                    {navItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive ? 'text-white bg-highlight' : 'text-text-secondary hover:text-white hover:bg-accent/50'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                 <footer className="mt-auto">
                    <Link to="/" className="block text-center w-full px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-white hover:bg-accent/50">
                        &larr; Back to Main Site
                    </Link>
                </footer>
            </aside>

            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;