import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Role } from '../types';

const UserIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);


export const About: React.FC = () => {
    const { users } = useContext(DataContext);
    const executives = users.filter(user => user.role === Role.EXECUTIVE_MEMBER);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
            <header className="glass-effect rounded-xl shadow-lg p-8 mb-12">
                <h1 className="text-6xl font-heading text-white text-center mb-4 tracking-wider">About Dhaka College Cultural Club</h1>
                <p className="text-2xl font-heading text-highlight text-center mb-6 tracking-wider">Fostering Creativity, Celebrating Culture.</p>
                <div className="prose prose-invert lg:prose-xl mx-auto text-text-primary max-w-none text-justify">
                    <p>
                        The Dhaka College Cultural Club (DCCC) is a vibrant student-led organization dedicated to nurturing and promoting the diverse cultural talents within Dhaka College. Established with the vision to create a platform for artistic expression, DCCC has become a cornerstone of campus life, encouraging students to explore their creative potential beyond academics.
                    </p>
                    <p>
                        Our mission is to foster a rich cultural environment where students can engage in various activities, including literature, music, dance, drama, debate, and fine arts. We organize regular workshops, competitions, and cultural festivals to provide our members with opportunities to learn, collaborate, and showcase their skills.
                    </p>
                    <p>
                        At DCCC, we believe that culture is the soul of a community. We strive to build a strong, inclusive community where every voice is heard, every talent is celebrated, and every member feels a sense of belonging.
                    </p>
                </div>
            </header>

            <section>
                <h2 className="text-5xl font-heading text-white text-center mb-8 tracking-wider">Meet the Executive Panel</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {executives.map(member => (
                        <div key={member.id} className="glass-effect rounded-lg p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-highlight/10">
                             <div className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-highlight bg-primary flex items-center justify-center">
                               <UserIcon className="h-20 w-20 text-text-secondary" />
                            </div>
                            <h3 className="text-xl font-bold text-white">{member.name}</h3>
                            <p className="text-highlight font-semibold">{member.role}</p>
                            <p className="text-text-secondary text-sm">{member.batch}, {member.province}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

const LazyAbout = () => <About />;
export default LazyAbout;