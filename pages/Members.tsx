import React, { useContext, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { Role } from '../types';

const UserIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const Members: React.FC = () => {
    const { users } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');

    const officialMembers = useMemo(() => {
        return users.filter(user => user.role !== Role.GENERAL_STUDENT)
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [users]);

    const filteredMembers = useMemo(() => {
        if (!searchTerm) return officialMembers;
        return officialMembers.filter(member => 
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.province.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, officialMembers]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
            <header className="text-center mb-12">
                <h1 className="text-7xl font-heading text-white tracking-wider sm:text-8xl">Member Directory</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">Connect with the official members of our club community.</p>
            </header>
            
            <div className="mb-8 max-w-lg mx-auto">
                <input 
                    type="text"
                    placeholder="Search by name, batch, or province..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full form-input rounded-full"
                />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMembers.map(member => (
                    <Link to={`/members/${member.id}`} key={member.id} className="block">
                        <div className="glass-effect h-full rounded-lg p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-highlight/10">
                            <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-accent bg-primary flex items-center justify-center">
                                <UserIcon className="h-14 w-14 text-text-secondary" />
                            </div>
                            <h3 className="text-lg font-bold text-white">{member.name}</h3>
                            <p className="text-highlight font-semibold text-sm">{member.role}</p>
                            <p className="text-text-secondary text-xs mt-2">{member.batch}, {member.province}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const LazyMembers = () => <Members />;
export default LazyMembers;