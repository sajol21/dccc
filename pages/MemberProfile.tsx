import React, { useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { SubmissionCard } from '../components/SubmissionCard';
import { SubmissionStatus } from '../types';

const UserIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const MemberProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { getUserById, submissions } = useContext(DataContext);

  if (!userId) {
    return <Navigate to="/members" />;
  }
  
  const user = getUserById(parseInt(userId, 10));

  if (!user) {
    return (
        <div className="text-center py-20">
            <h1 className="text-4xl font-heading">Member Not Found</h1>
            <p className="text-text-secondary mt-2">The requested member profile could not be found.</p>
        </div>
    );
  }

  const userSubmissions = submissions.filter(s => s.authorId === user.id && s.status === SubmissionStatus.APPROVED);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <div className="glass-effect rounded-xl shadow-lg overflow-hidden p-8 mb-8 flex flex-col md:flex-row items-start">
        <div className="h-32 w-32 rounded-full bg-accent flex items-center justify-center border-4 border-highlight mb-6 md:mb-0 md:mr-8 flex-shrink-0">
          <UserIcon className="h-20 w-20 text-text-secondary" />
        </div>
        <div className="flex-grow">
          <h1 className="text-6xl font-heading text-white tracking-wide">{user.name}</h1>
          <p className="text-lg text-highlight font-semibold">{user.role}</p>
          <div className="mt-4 text-text-secondary space-y-1">
            <p><strong>Batch:</strong> {user.batch}</p>
            <p><strong>Province:</strong> {user.province}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-5xl font-heading text-white mb-6 tracking-wide">{user.name}'s Showcase</h2>
        {userSubmissions.length > 0 ? (
          <div className="grid gap-8">
            {userSubmissions.map(submission => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-effect rounded-xl">
            <h3 className="text-xl font-semibold text-white">No Submissions Yet</h3>
            <p className="text-text-secondary mt-2">{user.name} hasn't had any submissions approved yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const LazyMemberProfile = () => <MemberProfile />;
export default LazyMemberProfile;