
import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

export const Activities: React.FC = () => {
    const { activities } = useContext(DataContext);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
            <div className="text-center mb-12">
                <h1 className="text-7xl font-heading text-white tracking-wider sm:text-8xl">Club Activities</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">Explore the various wings and regular activities of our club.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {activities.map(activity => (
                    <div key={activity.id} className="glass-effect rounded-lg overflow-hidden flex flex-col md:flex-row">
                        <img src={activity.imageUrl} alt={activity.title} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
                        <div className="p-6 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-white">{activity.title}</h3>
                            <p className="text-text-secondary mt-2">{activity.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LazyActivities = () => <Activities />;
export default LazyActivities;
