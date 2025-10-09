import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { SubmissionType } from '../types';
import { AuthContext } from '../context/AuthContext';


export const ShowcaseForm: React.FC = () => {
    const { addSubmission } = useContext(DataContext);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<SubmissionType>(SubmissionType.WRITING);
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    if (!currentUser) {
        return <p>You must be logged in to submit content.</p>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (type === SubmissionType.IMAGE || type === SubmissionType.VIDEO) {
            try {
                new URL(content);
            } catch (_) {
                setError('Please provide a valid URL for images or videos.');
                return;
            }
        }
        
        if (!title.trim() || !description.trim() || !content.trim()) {
            setError('All fields are required.');
            return;
        }

        addSubmission({ title, description, type, content }, currentUser.id);
        
        setSubmitted(true);
        setTitle('');
        setDescription('');
        setType(SubmissionType.WRITING);
        setContent('');

        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
            <div className="glass-effect p-8 rounded-xl shadow-xl">
                <h1 className="text-5xl font-heading text-white mb-6 text-center tracking-wider">Showcase Your Talent</h1>
                {submitted ? (
                    <div className="text-center p-8 bg-green-500/20 border border-green-500/50 rounded-lg">
                        <h2 className="text-2xl font-bold text-white">Submission Received!</h2>
                        <p className="text-text-secondary mt-2">Thank you for your submission. It has been sent for review by our moderators.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-1">Title</label>
                            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-1">Description</label>
                            <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} required className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-text-primary mb-1">Submission Type</label>
                            <select id="type" value={type} onChange={e => setType(e.target.value as SubmissionType)} required className="form-select">
                                {Object.values(SubmissionType).map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-text-primary mb-1">
                                {type === SubmissionType.WRITING ? 'Content' : 'Link (URL)'}
                            </label>
                            <textarea id="content" value={content} onChange={e => setContent(e.target.value)} required className="form-textarea min-h-[150px]" 
                                placeholder={type !== SubmissionType.WRITING ? 'e.g., https://example.com/image.jpg' : 'Write your masterpiece here...'}
                            />
                        </div>
                         <div className="flex justify-end">
                            <button type="submit" className="btn btn-highlight">
                                Submit for Review
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

const LazyShowcaseForm = () => <ShowcaseForm />;
export default LazyShowcaseForm;