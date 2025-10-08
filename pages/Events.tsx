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

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">Upcoming Events</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">Stay updated with all our workshops, competitions, and gatherings.</p>
            </div>

            <div className="space-y-8">
                {events.sort((a,b) => a.date.getTime() - b.date.getTime()).map(event => (
                    <div key={event.id} className="bg-secondary p-6 rounded-lg shadow-lg flex flex-col md:flex-row">
                        <div className="md:w-1/4 text-center md:text-left mb-4 md:mb-0">
                            <div className="text-highlight text-2xl font-bold">{event.date.toLocaleString('default', { month: 'short' })}</div>
                            <div className="text-white text-5xl font-extrabold">{event.date.getDate()}</div>
                             <div className="text-text-secondary text-lg font-bold">{event.date.getFullYear()}</div>
                        </div>
                        <div className="md:w-3/4 md:border-l md:border-accent md:pl-6">
                            <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                            <div className="flex items-center text-text-secondary text-sm mb-1">
                                <CalendarIcon/>
                                <span>{event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                             <div className="flex items-center text-text-secondary text-sm mb-4">
                                <LocationIcon/>
                                <span>{event.venue}</span>
                            </div>
                            <p className="text-text-primary">{event.description}</p>
                            <button className="mt-4 bg-highlight text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors">
                                RSVP / Register
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};