
import React from 'react';

const resources = [
  {
    category: 'Creative Writing',
    items: [
      { title: 'Grammarly', description: 'AI-powered writing assistant.', url: 'https://www.grammarly.com' },
      { title: 'Reedsy Plot Generator', description: 'Get new ideas for your next story.', url: 'https://blog.reedsy.com/plot-generator/' },
    ]
  },
  {
    category: 'Graphic Design & Photography',
    items: [
      { title: 'Canva', description: 'Easy-to-use online design tool.', url: 'https://www.canva.com' },
      { title: 'Pexels', description: 'Free stock photos and videos.', url: 'https://www.pexels.com' },
      { title: 'Photopea', description: 'Free online photo editor.', url: 'https://www.photopea.com' },
    ]
  },
  {
    category: 'Public Speaking',
    items: [
      { title: 'TED Talks', description: 'Watch talks from expert speakers.', url: 'https://www.ted.com/talks' },
      { title: 'Toastmasters International', description: 'Find a club to practice public speaking.', url: 'https://www.toastmasters.org' },
    ]
  }
];

export const Resources: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">Resource Hub</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">Useful tools and learning materials to help you improve your skills.</p>
      </div>

      <div className="space-y-10">
        {resources.map(category => (
          <div key={category.category}>
            <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-highlight pb-2">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map(item => (
                <a href={item.url} target="_blank" rel="noopener noreferrer" key={item.title} className="block bg-secondary p-6 rounded-lg shadow-lg hover:bg-accent hover:shadow-xl transition-all">
                  <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="text-sm text-text-secondary mt-1">{item.description}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
