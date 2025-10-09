import React, { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { Role } from '../../types';

const UserIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const ManageUsers: React.FC = () => {
  const { users, updateUserRole, toggleUserSuspension } = useContext(DataContext);

  return (
    <div>
      <h1 className="text-4xl font-heading text-white mb-6 tracking-wider">User Management</h1>
      <div className="overflow-x-auto glass-effect rounded-lg">
        <table className="min-w-full divide-y divide-accent">
          <thead className="bg-accent/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Role</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-secondary/50 divide-y divide-accent">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                                <UserIcon className="h-6 w-6 text-text-secondary" />
                            </div>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-text-primary">{user.name}</div>
                            <div className="text-sm text-text-secondary">{user.email}</div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isSuspended ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                        {user.isSuspended ? 'Suspended' : 'Active'}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value as Role)}
                    className="form-select py-1 px-2 text-sm"
                    disabled={user.role === Role.ADMIN}
                  >
                    {Object.values(Role).map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  <button 
                    onClick={() => toggleUserSuspension(user.id)}
                    disabled={user.role === Role.ADMIN}
                    className={`btn text-xs ${user.isSuspended ? 'btn-success' : 'btn-danger'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                      {user.isSuspended ? 'Unsuspend' : 'Suspend'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const LazyManageUsers = () => <ManageUsers />;
export default LazyManageUsers;