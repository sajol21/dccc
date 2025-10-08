import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import type { Event } from '../../types';

const EventForm: React.FC<{ event?: Event, onSave: (event: Omit<Event, 'id'> | Event) => void, onCancel: () => void }> = ({ event, onSave, onCancel }) => {
    const [title, setTitle] = useState(event?.title || '');
    const [date, setDate] = useState(event ? event.date.toISOString().substring(0, 16) : '');
    const [venue, setVenue] = useState(event?.venue || '');
    const [description, setDescription] = useState(event?.description || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const eventData = { title, date: new Date(date), venue, description };
        if (event) {
            onSave({ ...event, ...eventData });
        } else {
            onSave(eventData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-xl shadow-xl w-full max-w-lg space-y-4">
                <h2 className="text-xl font-bold text-white">{event ? 'Edit Event' : 'Add New Event'}</h2>
                <input type="text" placeholder="Event Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-accent/50 border-gray-600/50 rounded-md py-2 px-3 text-white"/>
                <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required className="w-full bg-accent/50 border-gray-600/50 rounded-md py-2 px-3 text-white"/>
                <input type="text" placeholder="Venue" value={venue} onChange={e => setVenue(e.target.value)} required className="w-full bg-accent/50 border-gray-600/50 rounded-md py-2 px-3 text-white"/>
                <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="w-full bg-accent/50 border-gray-600/50 rounded-md py-2 px-3 text-white"/>
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-sm font-medium text-text-secondary hover:bg-accent hover:text-white">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium bg-highlight text-white hover:bg-sky-400">Save Event</button>
                </div>
            </form>
        </div>
    );
};

export const ManageEvents: React.FC = () => {
    const { events, addEvent, updateEvent, deleteEvent } = useContext(DataContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined);

    const handleSave = (eventData: Omit<Event, 'id'> | Event) => {
        if ('id' in eventData) {
            updateEvent(eventData);
        } else {
            addEvent(eventData);
        }
        setModalOpen(false);
        setEditingEvent(undefined);
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Manage Events</h1>
                <button onClick={() => { setEditingEvent(undefined); setModalOpen(true); }} className="px-4 py-2 rounded-md text-sm font-medium bg-highlight text-white hover:bg-sky-400">Add Event</button>
            </div>

            <div className="space-y-4">
                {events.map(event => (
                    <div key={event.id} className="bg-accent/50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-bold text-text-primary">{event.title}</p>
                            <p className="text-sm text-text-secondary">{event.date.toLocaleDateString()} at {event.venue}</p>
                        </div>
                        <div className="space-x-3">
                            <button onClick={() => handleEdit(event)} className="text-blue-400 hover:text-blue-200 text-sm">Edit</button>
                            <button onClick={() => window.confirm('Are you sure you want to delete this event?') && deleteEvent(event.id)} className="text-red-500 hover:text-red-300 text-sm">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            
            {isModalOpen && <EventForm event={editingEvent} onSave={handleSave} onCancel={() => setModalOpen(false)} />}
        </div>
    );
};