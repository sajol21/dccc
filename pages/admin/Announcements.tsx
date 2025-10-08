import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';

export const Announcements: React.FC = () => {
    const { addGlobalNotification } = useContext(DataContext);
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            addGlobalNotification(message);
            setMessage('');
            setSent(true);
            setTimeout(() => setSent(false), 3000);
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-heading text-white mb-6 tracking-wider">Send Announcement</h1>
            <p className="text-text-secondary mb-6">This message will be sent as a notification to all users.</p>

            {sent && (
                <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-md relative mb-6">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> Announcement has been sent to all users.</span>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="announcement-message" className="block text-sm font-medium text-text-primary">Message</label>
                    <textarea 
                        id="announcement-message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                        rows={5}
                        className="mt-1 block w-full bg-accent/50 border-gray-600/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight"
                        placeholder="e.g., The Annual Cultural Fest is starting next week! Get ready."
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-primary bg-highlight hover:bg-amber-300">
                        Send Notification
                    </button>
                </div>
            </form>
        </div>
    );
};

const LazyAnnouncements = () => <Announcements />;
export default LazyAnnouncements;