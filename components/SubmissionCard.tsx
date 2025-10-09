import React, { useContext, useState } from 'react';
import { Role, SubmissionType, type Submission } from '../types';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';

interface SubmissionCardProps {
  submission: Submission;
  onImageClick?: (imageUrl: string) => void;
}

const AppreciateIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-all duration-300 transform group-hover:scale-110 ${filled ? 'text-highlight fill-current' : 'text-text-secondary'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"></path>
    </svg>
);

const SuggestionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-secondary transition-all duration-300 transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
    </svg>
);

const UserIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const RoleBadge: React.FC<{ role: Role }> = ({ role }) => {
    const roleColors: Record<Role, string> = {
        [Role.ADMIN]: 'bg-red-500/20 text-red-300 border-red-500/30',
        [Role.EXECUTIVE_MEMBER]: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
        [Role.LIFETIME_MEMBER]: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        [Role.ASSOCIATE_MEMBER]: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        [Role.GENERAL_MEMBER]: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
        [Role.GENERAL_STUDENT]: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    };
    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${roleColors[role] || roleColors[Role.GENERAL_STUDENT]}`}>
            {role}
        </span>
    )
}

const SubmissionTypeTag: React.FC<{ type: SubmissionType }> = ({ type }) => {
    const typeStyles: Record<SubmissionType, string> = {
        [SubmissionType.WRITING]: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
        [SubmissionType.IMAGE]: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        [SubmissionType.VIDEO]: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    };
    return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${typeStyles[type]}`}>{type}</span>;
}

const SubmissionCardComponent: React.FC<SubmissionCardProps> = ({ submission, onImageClick }) => {
  const { getUserById, addComment, toggleAppreciation } = useContext(DataContext);
  const { currentUser } = useContext(AuthContext);
  const author = getUserById(submission.authorId);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [newSuggestion, setNewSuggestion] = useState('');
  
  const appreciated = currentUser ? submission.likedBy.includes(currentUser.id) : false;

  const handleAppreciate = () => {
    if(!currentUser) {
        alert("Please log in to appreciate submissions.");
        return;
    }
    toggleAppreciation(submission.id, currentUser.id);
  };

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSuggestion.trim() && currentUser) {
        addComment(submission.id, newSuggestion, { id: currentUser.id, name: currentUser.name, batch: currentUser.batch });
        setNewSuggestion('');
    }
  };

  const renderContent = () => {
    switch (submission.type) {
      case SubmissionType.WRITING:
        return <p className="text-text-secondary whitespace-pre-wrap leading-relaxed prose prose-invert max-w-none">{submission.content.substring(0, 350)}...</p>;
      case SubmissionType.IMAGE:
        return (
            <img 
                src={submission.content} 
                alt={submission.title} 
                onClick={() => onImageClick && onImageClick(submission.content)}
                className="rounded-lg object-cover w-full h-auto max-h-[60vh] border border-accent/50 cursor-pointer transition-transform duration-300 hover:scale-[1.02]" 
            />
        );
      case SubmissionType.VIDEO:
        return (
          <div className="aspect-video w-full rounded-lg border border-accent/50 overflow-hidden">
            <iframe
              src={submission.content}
              title={submission.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        );
      default:
        return null;
    }
  };

  if (!author) return null;

  return (
    <div className="glass-effect rounded-xl shadow-lg overflow-hidden transition-all duration-500 group hover:shadow-2xl hover:shadow-highlight/10 hover:border-highlight/30">
        <div className="p-6 sm:p-8">
            <header className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center ring-2 ring-highlight/50 flex-shrink-0">
                    <UserIcon className="h-6 w-6 text-text-secondary" />
                    </div>
                    <div>
                    <p className="font-bold text-text-primary">{author.name}</p>
                    <p className="text-sm text-text-secondary">{author.batch}, {author.province}</p>
                    </div>
                </div>
                <RoleBadge role={author.role} />
            </header>
            
            <main>
                <h3 className="text-3xl lg:text-4xl font-heading mb-2 text-white">{submission.title}</h3>
                <p className="text-sm text-text-secondary mb-4 italic">{submission.description}</p>
                <div className="my-6">
                    {renderContent()}
                </div>
            </main>

            <footer className="flex items-center justify-between text-text-secondary border-t border-accent/50 pt-4 mt-4">
                <div className="flex items-center space-x-6">
                <button onClick={handleAppreciate} className="flex items-center space-x-2 hover:text-white transition-colors group" title="Appreciate">
                    <AppreciateIcon filled={appreciated} />
                    <span className="font-semibold text-sm">{submission.likes}</span>
                </button>
                <button onClick={() => setShowSuggestions(!showSuggestions)} className="flex items-center space-x-2 hover:text-white transition-colors group" title="Suggestions">
                    <SuggestionIcon />
                    <span className="font-semibold text-sm">{submission.comments.length}</span>
                </button>
                </div>
                 <div className="flex items-center space-x-2">
                    <SubmissionTypeTag type={submission.type} />
                    <div className="text-xs">
                        {submission.createdAt.toLocaleDateString()}
                    </div>
                </div>
            </footer>
        </div>
      {showSuggestions && (
        <div className="p-6 sm:p-8 border-t border-accent/50 bg-primary/20 animate-fade-in">
          <h4 className="font-bold text-lg mb-3 text-white">Suggestions</h4>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {submission.comments.map(comment => (
              <div key={comment.id} className="bg-primary/50 p-3 rounded-lg">
                <p className="font-semibold text-sm text-text-primary">{comment.user.name} <span className="text-xs text-text-secondary">({comment.user.batch})</span></p>
                <p className="text-sm text-text-secondary mt-1">{comment.text}</p>
              </div>
            ))}
             {submission.comments.length === 0 && <p className="text-sm text-text-secondary italic">No suggestions yet.</p>}
          </div>
          {currentUser && (
            <form onSubmit={handleSuggestionSubmit} className="mt-4 flex space-x-2">
              <input 
                type="text" 
                value={newSuggestion}
                onChange={(e) => setNewSuggestion(e.target.value)}
                placeholder="Add a suggestion..." 
                className="form-input"
              />
              <button type="submit" className="btn btn-highlight">
                Post
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export const SubmissionCard = React.memo(SubmissionCardComponent);