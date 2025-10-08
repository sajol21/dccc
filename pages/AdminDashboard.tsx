
import React, { useState } from 'react';
import { UserManagement } from '../components/admin/UserManagement';
import { ContentModeration } from '../components/admin/ContentModeration';
import { LeaderboardManagement } from '../components/admin/LeaderboardManagement';

type Tab = 'content' | 'users' | 'leaderboard';

export const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('content');

    const renderTabContent = () => {
        switch(activeTab) {
            case 'content': return <ContentModeration />;
            case 'users': return <UserManagement />;
            case 'leaderboard': return <LeaderboardManagement />;
            default: return null;
        }
    };
    
    const TabButton = ({ tab, label }: { tab: Tab, label: string }) => (
        <button
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab ? 'bg-highlight text-white' : 'text-text-secondary hover:bg-accent'}`}
        >
          {label}
        </button>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>
            
            <div className="mb-6 bg-secondary p-2 rounded-lg inline-flex space-x-2">
                <TabButton tab="content" label="Content Moderation" />
                <TabButton tab="users" label="User Management" />
                <TabButton tab="leaderboard" label="Leaderboard" />
            </div>

            <div className="bg-secondary p-6 rounded-lg shadow-lg">
                {renderTabContent()}
            </div>
        </div>
    );
};