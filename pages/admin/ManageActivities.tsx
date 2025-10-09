
import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import type { Activity } from '../../types';

const ActivityForm: React.FC<{ activity?: Activity, onSave: (activity: Omit<Activity, 'id'> | Activity) => void, onCancel: () => void }> = ({ activity, onSave, onCancel }) => {
    const [title, setTitle] = useState(activity?.title || '');
    const [description, setDescription] = useState(activity?.description || '');
    const [imageUrl, setImageUrl] = useState(activity?.imageUrl || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const activityData = { title, description, imageUrl };
        if (activity) {
            onSave({ ...activity, ...activityData });
        } else {
            onSave(activityData);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-xl shadow-xl w-full max-w-lg space-y-4">
                <h2 className="text-xl font-bold text-white">{activity ? 'Edit Activity' : 'Add New Activity'}</h2>
                <input type="text" placeholder="Activity Title" value={title} onChange={e => setTitle(e.target.value)} required className="form-input"/>
                <input type="url" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="form-input"/>
                <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="form-textarea"/>
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-highlight">Save Activity</button>
                </div>
            </form>
        </div>
    );
};


export const ManageActivities: React.FC = () => {
  const { activities, addActivity, updateActivity, deleteActivity } = useContext(DataContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | undefined>(undefined);

  const handleSave = (activityData: Omit<Activity, 'id'> | Activity) => {
    if ('id' in activityData) {
      updateActivity(activityData);
    } else {
      addActivity(activityData);
    }
    setModalOpen(false);
    setEditingActivity(undefined);
  };
  
  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-heading text-white tracking-wider">Manage Activities</h1>
        <button onClick={() => { setEditingActivity(undefined); setModalOpen(true); }} className="btn btn-highlight">
            Add New Activity
        </button>
      </div>
      <div className="overflow-x-auto glass-effect rounded-lg">
        <table className="min-w-full divide-y divide-accent">
          <thead className="bg-accent/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-secondary/50 divide-y divide-accent">
            {activities.map(activity => (
              <tr key={activity.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">{activity.title}</td>
                <td className="px-6 py-4 text-sm text-text-secondary">{activity.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button onClick={() => handleEdit(activity)} className="text-blue-400 hover:text-blue-200">Edit</button>
                  <button onClick={() => window.confirm('Are you sure you want to delete this activity?') && deleteActivity(activity.id)} className="text-red-500 hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <ActivityForm activity={editingActivity} onSave={handleSave} onCancel={() => setModalOpen(false)} />}
    </div>
  );
};

const LazyManageActivities = () => <ManageActivities />;
export default LazyManageActivities;
