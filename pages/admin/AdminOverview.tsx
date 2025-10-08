
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../context/AppContext';
import { StatCard } from '../../components/admin/StatCard';
import { SubmissionStatus } from '../../types';

const icons = {
  Users: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Submissions: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  Pending: (p: React.SVGProps<SVGSVGElement>) => <svg {...p} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
}

export const AdminOverview: React.FC = () => {
    const { users, submissions } = useContext(AppContext);

    const pendingCount = useMemo(() => {
        return submissions.filter(s => s.status === SubmissionStatus.PENDING).length;
    }, [submissions]);

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Users" value={users.length} icon={<icons.Users />} />
                <StatCard title="Total Submissions" value={submissions.length} icon={<icons.Submissions />} />
                <StatCard title="Pending Approvals" value={pendingCount} icon={<icons.Pending />} />
            </div>
             <div className="mt-8">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <a href="#/admin/submissions" className="glass-effect px-4 py-2 rounded-lg text-text-primary hover:bg-highlight hover:text-white transition-colors">Manage Submissions</a>
                    <a href="#/admin/users" className="glass-effect px-4 py-2 rounded-lg text-text-primary hover:bg-highlight hover:text-white transition-colors">View Users</a>
                </div>
            </div>
        </div>
    );
};