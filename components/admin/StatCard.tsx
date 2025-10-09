import React from 'react';

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactElement<any>;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
    return (
        <div className="glass-effect p-6 rounded-xl flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-text-secondary">{title}</p>
                <p className="text-3xl font-bold text-white">{value}</p>
            </div>
            <div className="text-highlight bg-accent/50 p-3 rounded-lg">
                {React.cloneElement(icon, { className: 'h-8 w-8' })}
            </div>
        </div>
    );
};