import React, { useContext, useState, useMemo } from 'react';
import { DataContext } from '../../context/DataContext';
import { Submission, SubmissionStatus, SubmissionType } from '../../types';


const SubmissionEditForm: React.FC<{
    submission: Submission;
    onSave: (submission: Submission) => void;
    onCancel: () => void;
}> = ({ submission, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Submission>(submission);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required.';
        }

        if (formData.type === SubmissionType.IMAGE || formData.type === SubmissionType.VIDEO) {
            try {
                new URL(formData.content);
            } catch (_) {
                newErrors.content = 'Please enter a valid URL for image or video links.';
            }
        }
        
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-xl shadow-xl w-full max-w-lg space-y-4">
                <h2 className="text-2xl font-heading text-white tracking-wide">Edit Submission</h2>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-1">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required className="form-input" />
                    {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                </div>
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-text-primary mb-1">Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="form-select">
                        {Object.values(SubmissionType).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-text-primary mb-1">Content/Link</label>
                    <textarea name="content" value={formData.content} onChange={handleChange} required rows={5} className="form-textarea" />
                    {errors.content && <p className="text-red-400 text-xs mt-1">{errors.content}</p>}
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-1">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} className="form-textarea" />
                    {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                </div>
                <div className="flex justify-end space-x-4 pt-2">
                    <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-highlight">Save Changes</button>
                </div>
            </form>
        </div>
    );
};


export const ManageSubmissions: React.FC = () => {
    const { submissions, getUserById, updateSubmissionStatus, deleteSubmission, updateSubmission } = useContext(DataContext);
    const [filterStatus, setFilterStatus] = useState<SubmissionStatus | 'All'>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingSubmission, setEditingSubmission] = useState<Submission | null>(null);

    const filteredSubmissions = useMemo(() => {
        return submissions
            .filter(s => filterStatus === 'All' || s.status === filterStatus)
            .filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [submissions, filterStatus, searchTerm]);
    
    const getStatusColor = (status: SubmissionStatus) => {
        switch (status) {
            case SubmissionStatus.APPROVED: return 'bg-green-500/20 text-green-300';
            case SubmissionStatus.PENDING: return 'bg-yellow-500/20 text-yellow-300';
            case SubmissionStatus.REJECTED: return 'bg-red-500/20 text-red-300';
        }
    }
    
    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to permanently delete this submission?')) {
            deleteSubmission(id);
        }
    };

    const handleSave = (submission: Submission) => {
        updateSubmission(submission);
        setEditingSubmission(null);
    };

    return (
        <div>
            <h1 className="text-4xl font-heading text-white mb-6 tracking-wider">Manage Submissions</h1>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input 
                    type="text" 
                    placeholder="Search by title..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="form-input md:w-1/3"
                />
                 <select 
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value as any)}
                    className="form-select md:w-auto"
                >
                    <option value="All">All Statuses</option>
                    {Object.values(SubmissionStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
            
            <div className="overflow-x-auto glass-effect rounded-lg">
                <table className="min-w-full divide-y divide-accent">
                    <thead className="bg-accent/50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Title / Author</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Type</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-secondary/50 divide-y divide-accent">
                        {filteredSubmissions.map(sub => {
                            const author = getUserById(sub.authorId);
                            return (
                                <tr key={sub.id}>
                                    <td className="px-4 py-4">
                                        <p className="font-semibold text-text-primary">{sub.title}</p>
                                        <p className="text-xs text-text-secondary">by {author?.name || 'Unknown'}</p>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-text-secondary">{sub.type}</td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(sub.status)}`}>
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium space-x-2 whitespace-nowrap">
                                        {sub.status === SubmissionStatus.PENDING && (
                                            <>
                                                <button onClick={() => updateSubmissionStatus(sub.id, SubmissionStatus.APPROVED)} className="text-green-400 hover:text-green-200">Approve</button>
                                                <button onClick={() => updateSubmissionStatus(sub.id, SubmissionStatus.REJECTED)} className="text-yellow-400 hover:text-yellow-200">Reject</button>
                                            </>
                                        )}
                                        <button onClick={() => setEditingSubmission(sub)} className="text-blue-400 hover:text-blue-200">Edit</button>
                                        <button onClick={() => handleDelete(sub.id)} className="text-red-500 hover:text-red-300">Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                 {filteredSubmissions.length === 0 && <p className="text-center py-8 text-text-secondary">No submissions match the current filters.</p>}
            </div>

            {editingSubmission && (
                <SubmissionEditForm 
                    submission={editingSubmission}
                    onSave={handleSave}
                    onCancel={() => setEditingSubmission(null)}
                />
            )}
        </div>
    );
};

const LazyManageSubmissions = () => <ManageSubmissions />;
export default LazyManageSubmissions;