import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { SubmissionStatus, LeaderboardEntry } from '../types';

const UserIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const getRankStyles = (rank: number) => {
    if (rank === 1) return 'border-yellow-400 bg-yellow-400/10 shadow-highlight';
    if (rank === 2) return 'border-gray-400 bg-gray-400/10';
    if (rank === 3) return 'border-yellow-600 bg-yellow-600/10';
    return 'border-accent bg-accent/20';
}

const getRankTextColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-yellow-600';
    return 'text-text-secondary';
}

interface LeaderboardDisplayProps {
    entries: LeaderboardEntry[];
}

const LeaderboardDisplay: React.FC<LeaderboardDisplayProps> = ({ entries }) => {
    const { getUserById, submissions } = useContext(DataContext);

    if (entries.length === 0) {
        return (
            <div className="glass-effect p-8 rounded-xl text-center">
                <p className="text-text-secondary">The leaderboard for this period is not available yet. Check back soon!</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {entries.map(entry => {
                const user = getUserById(entry.memberId);
                if (!user) return null;

                const userSubmissions = submissions
                    .filter(s => s.authorId === user.id && s.status === SubmissionStatus.APPROVED)
                    .sort((a, b) => b.likes - a.likes);
        
                const topSubmission = userSubmissions.length > 0 ? userSubmissions[0] : null;

                return (
                    <div key={entry.rank} className={`glass-effect p-6 rounded-xl shadow-lg border-l-4 flex flex-col ${getRankStyles(entry.rank)}`}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className={`text-6xl font-heading ${getRankTextColor(entry.rank)}`}>
                                #{entry.rank}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-4 mb-2">
                                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center border-2 border-highlight/50 flex-shrink-0">
                                        <UserIcon className="h-9 w-9 text-text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{user.name}</h3>
                                        <p className="text-text-secondary">{user.batch}, {user.province}</p>
                                    </div>
                                </div>
                                <p className="text-text-primary italic">"{entry.note}"</p>
                            </div>
                        </div>
                        {topSubmission && (
                            <div className="mt-4 pt-4 border-t border-accent/50 ml-0 sm:ml-[100px]">
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
    )
}

export const Leaderboard: React.FC = () => {
    const { leaderboard, previousLeaderboard } = useContext(DataContext);
    
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
            <header className="text-center mb-12">
                <h1 className="text-7xl font-heading text-white tracking-wider sm:text-8xl">Leaderboard</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">Recognizing the top talents of our club, based on admin appreciation and judges' consideration.</p>
            </header>
            
            <section className="mb-12">
                <h2 className="text-5xl font-heading text-highlight tracking-wider mb-6 text-center sm:text-left">This Month's Standings</h2>
                <LeaderboardDisplay entries={leaderboard} />
            </section>

            {previousLeaderboard && (
                 <section>
                    <h2 className="text-5xl font-heading text-highlight tracking-wider mb-6 text-center sm:text-left">Last Month's Winners ({previousLeaderboard.month} {previousLeaderboard.year})</h2>
                    <LeaderboardDisplay entries={previousLeaderboard.entries} />
                </section>
            )}
        </div>
    );
};

const LazyLeaderboard = () => <Leaderboard />;
export default LazyLeaderboard;