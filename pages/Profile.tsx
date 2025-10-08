
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { SubmissionCard } from '../components/SubmissionCard';
import { SubmissionStatus } from '../types';

const UserIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const Profile: React.FC = () => {
  const { currentUser, submissions } = useContext(AppContext);

  if (!currentUser) {
    return <div className="text-center py-10">Please log in to view your profile.</div>;
  }

  const userSubmissions = submissions.filter(s => s.authorId === currentUser.id && s.status === SubmissionStatus.APPROVED);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <div className="glass-effect rounded-xl shadow-lg overflow-hidden p-8 mb-8 flex flex-col md:flex-row items-center">
        <div className="h-32 w-32 rounded-full bg-accent flex items-center justify-center border-4 border-highlight mb-6 md:mb-0 md:mr-8 flex-shrink-0">
          <UserIcon className="h-20 w-20 text-text-secondary" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white">{currentUser.name}</h1>
          <p className="text-lg text-highlight font-semibold">{currentUser.role}</p>
          <div className="mt-4 text-text-secondary space-y-1">
            <p><strong>Batch:</strong> {currentUser.batch}</p>
            <p><strong>Department:</strong> {currentUser.department}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Phone:</strong> {currentUser.phone}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">Your Approved Submissions</h2>
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
    </div>
  );
};