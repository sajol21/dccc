
import React from 'react';

interface StatCardProps {
    title: string;
    value: number | string;
    // FIX: Changed icon prop type to React.ReactElement<any> to solve issue with React.cloneElement inferring props as unknown.
    icon: React.ReactElement<any>;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
    return (
        <div className="glass-effect p-6 rounded-xl flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-text-secondary">{title}</p>
                <p className="text-3xl font-bold text-white">{value}</p>
            </div>
            <div className="text-highlight">
                {React.cloneElement(icon, { className: 'h-10 w-10' })}
            </div>
        </div>
    );
};
