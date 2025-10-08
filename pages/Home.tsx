import React, { useContext, useState, useMemo } from 'react';
import { DataContext } from '../context/DataContext';
import { SubmissionCard } from '../components/SubmissionCard';
import { SubmissionStatus, SubmissionType } from '../types';

export const Home: React.FC = () => {
  const { submissions } = useContext(DataContext);
  const [filter, setFilter] = useState<SubmissionType | 'All'>('All');

  const approvedSubmissions = useMemo(() => {
    return submissions
      .filter(s => s.status === SubmissionStatus.APPROVED)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    if (filter === 'All') {
      return approvedSubmissions;
    }
    return approvedSubmissions.filter(s => s.type === filter);
  }, [filter, approvedSubmissions]);

  const FilterButton = ({ type, label }: { type: SubmissionType | 'All', label: string }) => (
    <button
      onClick={() => setFilter(type)}
      className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 glass-effect hover:shadow-lg hover:shadow-highlight/20 ${filter === type ? 'bg-highlight/50 text-white' : 'text-text-secondary hover:text-white'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <div className="text-center mb-12">
        <h1 className="text-7xl font-heading text-white tracking-wider sm:text-8xl md:text-9xl">
          <span className="block">DCCC</span>
          <span className="block text-highlight">Talent Showcase</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-text-secondary">Explore the vibrant talents from the members of Dhaka College Cultural Club.</p>
      </div>

      <div className="flex justify-center space-x-2 mb-10">
        <FilterButton type="All" label="All" />
        <FilterButton type={SubmissionType.WRITING} label="Writings" />
        <FilterButton type={SubmissionType.IMAGE} label="Images" />
        <FilterButton type={SubmissionType.VIDEO} label="Videos" />
      </div>

      {filteredSubmissions.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
          {filteredSubmissions.map((submission, index) => (
            <div key={submission.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in-up">
              <SubmissionCard submission={submission} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-effect rounded-xl">
          <h3 className="text-xl font-semibold text-white">No Submissions Found</h3>
          <p className="text-text-secondary mt-2">There are no approved submissions in this category yet. Check back later!</p>
        </div>
      )}
    </div>
  );
};

// Add this to your global CSS or a style tag if not already present
const animationStyles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
    opacity: 0;
  }
`;

// A simple component to inject styles
const StyleInjector: React.FC = () => <style>{animationStyles}</style>;

// You can include <StyleInjector /> once in your App.tsx or layout component.
// For this single-file change, we'll assume it's handled globally.
// In a real app, you would add this to your main CSS file.
const LazyHome = () => <Home />;
export default LazyHome;