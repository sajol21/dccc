import React, { useContext, useState, useMemo } from 'react';
import { DataContext } from '../context/DataContext';
import { SubmissionCard } from '../components/SubmissionCard';
import { SubmissionStatus, SubmissionType } from '../types';
import { ImageModal } from '../components/ImageModal';
import { BackToTopButton } from '../components/BackToTopButton';

export const Home: React.FC = () => {
  const { submissions, getUserById } = useContext(DataContext);
  const [filter, setFilter] = useState<SubmissionType | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const approvedSubmissions = useMemo(() => {
    return submissions
      .filter(s => s.status === SubmissionStatus.APPROVED)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    let result = approvedSubmissions;

    if (filter !== 'All') {
      result = result.filter(s => s.type === filter);
    }

    if (searchTerm.trim() !== '') {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      result = result.filter(s => {
        const author = getUserById(s.authorId);
        return (
          s.title.toLowerCase().includes(lowercasedSearchTerm) ||
          (author && author.name.toLowerCase().includes(lowercasedSearchTerm))
        );
      });
    }

    return result;
  }, [filter, searchTerm, approvedSubmissions, getUserById]);

  const FilterButton = ({ type, label }: { type: SubmissionType | 'All', label: string }) => (
    <button
      onClick={() => setFilter(type)}
      className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 glass-effect hover:shadow-lg hover:shadow-highlight/20 ${filter === type ? 'bg-highlight text-primary' : 'text-text-secondary hover:text-white'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-heading text-white tracking-wider sm:text-7xl md:text-8xl">
          <span className="block">DCCC</span>
          <span className="block text-highlight">Talent Showcase</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-text-secondary">Explore the vibrant talents from the members of Dhaka College Cultural Club.</p>
      </header>

      <section className="mb-10 space-y-6">
         <div className="flex justify-center flex-wrap gap-2">
            <FilterButton type="All" label="All" />
            <FilterButton type={SubmissionType.WRITING} label="Writings" />
            <FilterButton type={SubmissionType.IMAGE} label="Images" />
            <FilterButton type={SubmissionType.VIDEO} label="Videos" />
        </div>
        <div className="max-w-xl mx-auto">
            <input 
                type="text"
                placeholder="Search by title or author name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full form-input rounded-full"
            />
        </div>
      </section>

      <main>
        {filteredSubmissions.length > 0 ? (
          <div className="masonry-container">
            {filteredSubmissions.map((submission) => (
              <div key={submission.id} className="masonry-item">
                <SubmissionCard submission={submission} onImageClick={handleImageClick} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-effect rounded-xl">
            <h3 className="text-xl font-semibold text-white">No Submissions Found</h3>
            <p className="text-text-secondary mt-2">No submissions match your current filters. Try a different search or category!</p>
          </div>
        )}
      </main>

      {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
      <BackToTopButton />
    </div>
  );
};

export default Home;