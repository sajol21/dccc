
import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export const EventManagement: React.FC = () => {
  const { addEvent } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && date && venue && description) {
      addEvent({
        title,
        date: new Date(date),
        venue,
        description,
      });
      setTitle('');
      setDate('');
      setVenue('');
      setDescription('');
      alert('Event added!');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Event Management</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="event-title" className="block text-sm font-medium text-text-primary">Event Title</label>
          <input type="text" id="event-title" value={title} onChange={e => setTitle(e.target.value)} required
            className="mt-1 block w-full bg-accent border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-highlight" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="event-date" className="block text-sm font-medium text-text-primary">Date & Time</label>
            <input type="datetime-local" id="event-date" value={date} onChange={e => setDate(e.target.value)} required
              className="mt-1 block w-full bg-accent border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-highlight" />
          </div>
          <div>
            <label htmlFor="event-venue" className="block text-sm font-medium text-text-primary">Venue</label>
            <input type="text" id="event-venue" value={venue} onChange={e => setVenue(e.target.value)} required
              className="mt-1 block w-full bg-accent border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-highlight" />
          </div>
        </div>
        <div>
          <label htmlFor="event-description" className="block text-sm font-medium text-text-primary">Description</label>
          <textarea id="event-description" value={description} onChange={e => setDescription(e.target.value)} required rows={4}
            className="mt-1 block w-full bg-accent border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-highlight"></textarea>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-highlight hover:bg-blue-700 transition-colors">
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};
