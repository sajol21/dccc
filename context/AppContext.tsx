import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { DataProvider } from './DataContext';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <DataProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </DataProvider>
    );
};
