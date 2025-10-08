
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { SubmissionStatus } from '../types';

const UserIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const Leaderboard: React.FC = () => {
    const { leaderboard, getUserById, submissions } = useContext(AppContext);
    
    const getRankColor = (rank: number) => {
        if (rank === 1) return 'border-yellow-400 bg-yellow-400/10';
        if (rank === 2) return 'border-gray-400 bg-gray-400/10';
        if (rank === 3) return 'border-yellow-600 bg-yellow-600/10';
        return 'border-accent bg-accent/20';
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">Monthly Leaderboard</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">Recognizing the top talents of our club for this month. Based on Admin Appreciation and Judges' Consideration.</p>
            </div>

            <div className="space-y-6">
                {leaderboard.map(entry => {
                    const user = getUserById(entry.memberId);
                    if (!user) return null;

                    const userSubmissions = submissions
                        .filter(s => s.authorId === user.id && s.status === SubmissionStatus.APPROVED)
                        .sort((a, b) => b.likes - a.likes);
            
                    const topSubmission = userSubmissions.length > 0 ? userSubmissions[0] : null;

                    return (
                        <div key={entry.rank} className={`glass-effect p-6 rounded-xl shadow-lg border-l-4 flex flex-col ${getRankColor(entry.rank)}`}>
                            <div className="flex items-start space-x-6">
                                <div className={`text-5xl font-extrabold ${entry.rank === 1 ? 'text-yellow-400' : entry.rank === 2 ? 'text-gray-400' : entry.rank === 3 ? 'text-yellow-600' : 'text-text-secondary'}`}>
                                    #{entry.rank}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-4 mb-2">
                                        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center border-2 border-highlight flex-shrink-0">
                                            <UserIcon className="h-9 w-9 text-text-secondary" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">{user.name}</h3>
                                            <p className="text-text-secondary">{user.batch}, {user.department}</p>
                                        </div>
                                    </div>
                                    <p className="text-text-primary italic">"{entry.note}"</p>
                                </div>
                            </div>
                            {topSubmission && (
                                <div className="mt-4 pt-4 border-t border-accent/50 ml-20">
                                    <h4 className="text-sm font-semibold text-text-secondary mb-2">Top Contribution</h4>
                                    <div className="bg-primary/50 p-3 rounded-lg hover:bg-primary transition-colors">
                                        <p className="font-bold text-text-primary">{topSubmission.title}</p>
                                        <p className="text-xs text-text-secondary mt-1 truncate">{topSubmission.description}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};