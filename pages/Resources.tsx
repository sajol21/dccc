import React from 'react';

const resources = [
  {
    category: 'Creative Writing',
    items: [
      { title: 'Grammarly', description: 'AI-powered writing assistant.', url: 'https://www.grammarly.com' },
      { title: 'Reedsy Plot Generator', description: 'Get new ideas for your next story.', url: 'https://blog.reedsy.com/plot-generator/' },
      { title: 'Hemingway App', description: 'Makes your writing bold and clear.', url: 'https://hemingwayapp.com/' },
    ]
  },
  {
    category: 'Graphic Design & Photography',
    items: [
      { title: 'Canva', description: 'Easy-to-use online design tool.', url: 'https://www.canva.com' },
      { title: 'Pexels', description: 'Free stock photos and videos.', url: 'https://www.pexels.com' },
      { title: 'Photopea', description: 'Free online photo editor.', url: 'https://www.photopea.com' },
      { title: 'Figma', description: 'Collaborative interface design tool.', url: 'https://www.figma.com' },
    ]
  },
  {
    category: 'Video & Animation',
    items: [
      { title: 'DaVinci Resolve', description: 'Professional video editing, color correction, and audio post production.', url: 'https://www.blackmagicdesign.com/products/davinciresolve' },
      { title: 'Kdenlive', description: 'Free and open-source video editor.', url: 'https://kdenlive.org' },
      { title: 'Blender', description: 'Free 3D creation suite, including animation and VFX.', url: 'https://www.blender.org' },
    ]
  },
  {
    category: 'Music & Audio',
    items: [
      { title: 'Audacity', description: 'Free, open source, cross-platform audio software.', url: 'https://www.audacityteam.org/' },
      { title: 'BandLab', description: 'Free online music creation studio.', url: 'https://www.bandlab.com/' },
      { title: 'Soundtrap', description: 'Collaborative music and podcast recording studio by Spotify.', url: 'https://www.soundtrap.com/' },
    ]
  },
  {
    category: 'Public Speaking',
    items: [
      { title: 'TED Talks', description: 'Watch talks from expert speakers.', url: 'https://www.ted.com/talks' },
      { title: 'Toastmasters International', description: 'Find a club to practice public speaking.', url: 'https://www.toastmasters.org' },
    ]
  },
  {
    category: 'General Creativity',
    items: [
      { title: 'Behance', description: 'Showcase and discover the latest work from top creative professionals.', url: 'https://www.behance.net/' },
      { title: 'Dribbble', description: 'A community for creatives to share, grow, and get hired.', url: 'https://dribbble.com/' },
      { title: 'Skillshare', description: 'Online learning community with thousands of classes for creative people.', url: 'https://www.skillshare.com/' },
    ]
  }
];

export const Resources: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <header className="text-center mb-12">
        <h1 className="text-7xl font-heading text-white tracking-wider sm:text-8xl">Resource Hub</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">Useful tools and learning materials to help you improve your skills.</p>
      </header>

      <div className="space-y-10">
        {resources.map(category => (
          <section key={category.category}>
            <h2 className="text-4xl font-heading text-white mb-4 border-b-2 border-highlight pb-2 tracking-wider">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map(item => (
                <a href={item.url} target="_blank" rel="noopener noreferrer" key={item.title} className="block glass-effect p-6 rounded-lg shadow-lg hover:border-highlight/50 hover:shadow-xl transition-all hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="text-sm text-text-secondary mt-1">{item.description}</p>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

const LazyResources = () => <Resources />;
export default LazyResources;