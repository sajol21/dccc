import React, { useContext, useMemo } from 'react';
import { DataContext } from '../../context/DataContext';
import { SubmissionStatus } from '../../types';

export const ContentModeration: React.FC = () => {
  const { submissions, getUserById, updateSubmissionStatus } = useContext(DataContext);

  const pendingSubmissions = useMemo(() => {
    return submissions.filter(s => s.status === SubmissionStatus.PENDING);
  }, [submissions]);

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Content Moderation</h2>
      {pendingSubmissions.length > 0 ? (
        <div className="space-y-4">
          {pendingSubmissions.map(submission => {
            const author = getUserById(submission.authorId);
            return (
              <div key={submission.id} className="bg-accent p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-bold text-text-primary">{submission.title}</p>
                  <p className="text-sm text-text-secondary">By {author?.name} | Type: {submission.type}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => updateSubmissionStatus(submission.id, SubmissionStatus.APPROVED)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded-md transition-colors">
                    Approve
                  </button>
                  <button 
                    onClick={() => updateSubmissionStatus(submission.id, SubmissionStatus.REJECTED)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded-md transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-text-secondary">No pending submissions to review.</p>
      )}
    </div>
  );
};