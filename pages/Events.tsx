import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
);
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

export const Events: React.FC = () => {
    const { events } = useContext(DataContext);

    const sortedEvents = events.sort((a,b) => a.date.getTime() - b.date.getTime());

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
            <header className="text-center mb-12">
                <h1 className="text-7xl font-heading text-white tracking-wider sm:text-8xl">Upcoming Events</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">Stay updated with all our workshops, competitions, and gatherings.</p>
            </header>

            <div className="space-y-8">
                {sortedEvents.length > 0 ? sortedEvents.map(event => (
                    <div key={event.id} className="glass-effect p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6 border border-accent/50">
                        <div className="text-center flex-shrink-0">
                            <div className="text-highlight text-2xl font-bold">{event.date.toLocaleString('default', { month: 'short' })}</div>
                            <div className="text-white text-5xl font-extrabold">{event.date.getDate()}</div>
                             <div className="text-text-secondary text-lg font-bold">{event.date.getFullYear()}</div>
                        </div>
                        <div className="w-full md:border-l md:border-accent/50 md:pl-6">
                            <h3 className="text-3xl font-bold text-white mb-2">{event.title}</h3>
                            <div className="flex items-center text-text-secondary text-sm mb-1">
                                <CalendarIcon/>
                                <span>{event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                             <div className="flex items-center text-text-secondary text-sm mb-4">
                                <LocationIcon/>
                                <span>{event.venue}</span>
                            </div>
                            <p className="text-text-primary">{event.description}</p>
                            <button className="mt-4 btn btn-highlight">
                                RSVP / Register
                            </button>
                        </div>
                    </div>
                )) : (
                     <div className="text-center py-16 glass-effect rounded-xl">
                        <h3 className="text-xl font-semibold text-white">No Upcoming Events</h3>
                        <p className="text-text-secondary mt-2">Check back later for new events!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const LazyEvents = () => <Events />;
export default LazyEvents;