import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { SubmissionType } from '../types';

export const ShowcaseForm: React.FC = () => {
    const { addSubmission } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [type, setType] = useState<SubmissionType>(SubmissionType.WRITING);
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addSubmission({ title, type, content, description });
        
        setTitle('');
        setType(SubmissionType.WRITING);
        setContent('');
        setDescription('');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };
    
    const getLabelAndPlaceholder = () => {
        switch (type) {
            case SubmissionType.WRITING:
                return { label: 'Content Body', placeholder: 'Write your article, poem, or story here...' };
            case SubmissionType.IMAGE:
                return { label: 'Image Link', placeholder: 'e.g., https://imgur.com/your-image.jpg' };
            case SubmissionType.VIDEO:
                return { label: 'Video Embed Link', placeholder: 'e.g., https://www.youtube.com/embed/your-video-id' };
            default:
                return { label: '', placeholder: '' };
        }
    };

    const { label, placeholder } = getLabelAndPlaceholder();

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
            <div className="glass-effect p-8 rounded-xl shadow-xl">
                <h1 className="text-3xl font-bold text-white mb-2">Showcase Your Talent</h1>
                <p className="text-text-secondary mb-6">Share your creation with the community. All submissions will be reviewed by an admin before being published.</p>

                {submitted && (
                    <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-md relative mb-6" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline"> Your submission has been sent for review.</span>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-text-primary">Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required
                            className="mt-1 block w-full bg-accent/50 border-gray-600/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight placeholder-text-secondary/50" />
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-text-primary">Type</label>
                        <select id="type" value={type} onChange={e => setType(e.target.value as SubmissionType)}
                            className="mt-1 block w-full bg-accent/50 border-gray-600/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight">
                            {Object.values(SubmissionType).map(t => <option key={t} value={t} className="bg-secondary">{t}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-text-primary">{label}</label>
                        {type === SubmissionType.WRITING ? (
                             <textarea id="content" value={content} onChange={e => setContent(e.target.value)} required rows={10} placeholder={placeholder}
                             className="mt-1 block w-full bg-accent/50 border-gray-600/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight placeholder-text-secondary/50"></textarea>
                        ) : (
                            <input type="url" id="content" value={content} onChange={e => setContent(e.target.value)} required placeholder={placeholder}
                            className="mt-1 block w-full bg-accent/50 border-gray-600/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight placeholder-text-secondary/50" />
                        )}
                       
                    </div>

                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-text-primary">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={3} placeholder="A short description of your work."
                             className="mt-1 block w-full bg-accent/50 border-gray-600/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight placeholder-text-secondary/50"></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-highlight hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-highlight transition-colors shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                            Submit for Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};