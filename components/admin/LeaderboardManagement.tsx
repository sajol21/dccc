
import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import type { LeaderboardEntry } from '../../types';

export const LeaderboardManagement: React.FC = () => {
    const { leaderboard, users, setLeaderboard } = useContext(AppContext);
    const [entries, setEntries] = useState<LeaderboardEntry[]>(leaderboard);

    const handleUpdate = (index: number, field: keyof LeaderboardEntry, value: string | number) => {
        const newEntries = [...entries];
        (newEntries[index] as any)[field] = value;
        setEntries(newEntries);
    };

    const handleSaveChanges = () => {
        setLeaderboard(entries);
        alert('Leaderboard saved!');
    };
    
    return (
        <div>
            <h2 className="text-xl font-bold text-white mb-4">Leaderboard Management</h2>
            <div className="space-y-4 mb-6">
                {entries.map((entry, index) => (
                    <div key={index} className="bg-accent p-4 rounded-lg flex items-center space-x-4">
                        <span className="font-bold text-lg text-text-primary">#{entry.rank}</span>
                        <select
                            value={entry.memberId}
                            onChange={(e) => handleUpdate(index, 'memberId', parseInt(e.target.value))}
                            className="flex-1 bg-primary border border-gray-600 rounded-md py-1 px-2 text-white"
                        >
                            <option value="">Select Member</option>
                            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                        <input
                            type="text"
                            value={entry.note}
                            onChange={(e) => handleUpdate(index, 'note', e.target.value)}
                            placeholder="Note from judges..."
                            className="flex-2 bg-primary border border-gray-600 rounded-md py-1 px-2 text-white w-1/2"
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={handleSaveChanges}
                className="bg-highlight hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
                Save Leaderboard
            </button>
        </div>
    );
};
