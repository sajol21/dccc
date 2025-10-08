
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const icons = {
  Overview: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Submissions: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Users: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Announcements: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V4a2 2 0 00-2-2H7a2 2 0 00-2 2v1.882M11 5.882a3 3 0 01-2.12.879l-.78.146a3 3 0 00-2.12.879V10.5M11 5.882v4.618m2-10.455a2 2 0 012-2h2a2 2 0 012 2v1.882a3 3 0 002.12.879l.78.146a3 3 0 012.12.879V10.5M13 5.882v4.618m0 0a3 3 0 01-3 3H8a3 3 0 01-3-3v-1.118a3 3 0 01.879-2.121l.146-.78a3 3 0 00.879-2.121V4a2 2 0 012-2h2a2 2 0 012 2v1.882" /></svg>,
}

// FIX: Changed icon prop type to React.ReactElement<any> to solve issue with React.cloneElement inferring props as unknown.
const AdminNavItem: React.FC<{ to: string, label: string, icon: React.ReactElement<any>, end?: boolean }> = ({ to, label, icon, end = false }) => {
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
            ? 'bg-highlight/20 text-highlight shadow-md'
            : 'text-text-secondary hover:bg-white/10 hover:text-white'
        }`;
    return (
        <NavLink to={to} className={navLinkClass} end={end}>
            {React.cloneElement(icon, { className: 'h-5 w-5' })}
            <span className="flex-1">{label}</span>
        </NavLink>
    );
};

export const AdminLayout: React.FC = () => {
    const navItems = [
        { to: "/admin", label: "Overview", icon: <icons.Overview />, end: true },
        { to: "submissions", label: "Submissions", icon: <icons.Submissions /> },
        { to: "users", label: "Users", icon: <icons.Users /> },
        { to: "announcements", label: "Announcements", icon: <icons.Announcements /> },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:space-x-8">
                <aside className="md:w-64 flex-shrink-0 mb-8 md:mb-0">
                    <div className="glass-effect p-4 rounded-xl sticky top-24">
                        <h2 className="text-xl font-bold text-white mb-4 px-2">Admin Menu</h2>
                        <nav className="space-y-1">
                           {navItems.map(item => <AdminNavItem key={item.to} {...item} />)}
                        </nav>
                    </div>
                </aside>
                <main className="flex-1 min-w-0">
                    <div className="glass-effect p-6 sm:p-8 rounded-xl min-h-[60vh]">
                         <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};