import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';
import { SubmissionCard } from '../components/SubmissionCard';
import { SubmissionStatus, User, Province } from '../types';

const UserIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const EditProfileModal: React.FC<{
    user: User;
    onSave: (data: Partial<Omit<User, 'id' | 'email' | 'role'>>) => void;
    onCancel: () => void;
}> = ({ user, onSave, onCancel }) => {
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [batchYear, setBatchYear] = useState(user.batch.replace("HSC'", ""));
    const [province, setProvince] = useState(user.province);
    const inputClass = "block w-full bg-accent/50 border-gray-600/50 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight placeholder-text-secondary/50";
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, phone, batch: `HSC'${batchYear}`, province });
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-xl shadow-xl w-full max-w-lg space-y-4">
                <h2 className="text-2xl font-heading text-white tracking-wide">Edit Profile</h2>
                <div>
                    <label className="block text-sm font-medium text-text-primary">Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className={inputClass} required />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-text-primary">Phone</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-primary">Batch</label>
                    <div className="flex items-stretch">
                        <span className="inline-flex items-center px-3 rounded-l-md bg-accent/50 border border-r-0 border-gray-600/50 text-text-secondary">HSC'</span>
                        <input type="text" value={batchYear} onChange={e => setBatchYear(e.target.value.replace(/[^0-9]/g, ''))} placeholder="25" required className={`${inputClass} rounded-l-none`} />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-text-primary">Province</label>
                    <select value={province} onChange={e => setProvince(e.target.value as Province)} className={inputClass}>
                        <option value={Province.CULTURAL} className="bg-secondary">Cultural Province</option>
                        <option value={Province.TECHNICAL} className="bg-secondary">Technical Province</option>
                    </select>
                </div>
                <div className="flex justify-end space-x-4 pt-2">
                    <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-sm font-medium text-text-secondary hover:bg-accent hover:text-white transition-colors">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium bg-highlight text-primary hover:bg-amber-300 transition-colors">Save Changes</button>
                </div>
            </form>
        </div>
    );
};


export const Profile: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { submissions, updateCurrentUser } = useContext(DataContext);
  const [isEditing, setIsEditing] = useState(false);

  if (!currentUser) {
    return <div className="text-center py-10">Please log in to view your profile.</div>;
  }

  const handleSaveProfile = (data: Partial<Omit<User, 'id' | 'email' | 'role'>>) => {
      updateCurrentUser(data);
      setIsEditing(false);
  };

  const userSubmissions = submissions.filter(s => s.authorId === currentUser.id && s.status === SubmissionStatus.APPROVED);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <div className="glass-effect rounded-xl shadow-lg overflow-hidden p-8 mb-8 flex flex-col md:flex-row items-start">
        <div className="h-32 w-32 rounded-full bg-accent flex items-center justify-center border-4 border-highlight mb-6 md:mb-0 md:mr-8 flex-shrink-0">
          <UserIcon className="h-20 w-20 text-text-secondary" />
        </div>
        <div className="flex-grow">
          <h1 className="text-6xl font-heading text-white tracking-wide">{currentUser.name}</h1>
          <p className="text-lg text-highlight font-semibold">{currentUser.role}</p>
          <div className="mt-4 text-text-secondary space-y-1">
            <p><strong>Batch:</strong> {currentUser.batch}</p>
            <p><strong>Province:</strong> {currentUser.province}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Phone:</strong> {currentUser.phone}</p>
          </div>
        </div>
        <div>
           <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm font-medium text-text-primary bg-accent/50 rounded-md hover:bg-accent transition-colors">
             Edit Profile
           </button>
        </div>
      </div>
      
      <div>
        <h2 className="text-5xl font-heading text-white mb-6 tracking-wide">Your Approved Submissions</h2>
        {userSubmissions.length > 0 ? (
          <div className="grid gap-8">
            {userSubmissions.map(submission => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-effect rounded-xl">
            <h3 className="text-xl font-semibold text-white">No Submissions Yet</h3>
            <p className="text-text-secondary mt-2">You haven't had any submissions approved yet. Showcase your talent!</p>
          </div>
        )}
      </div>
       {isEditing && <EditProfileModal user={currentUser} onSave={handleSaveProfile} onCancel={() => setIsEditing(false)} />}
    </div>
  );
};

const LazyProfile = () => <Profile />;
export default LazyProfile;