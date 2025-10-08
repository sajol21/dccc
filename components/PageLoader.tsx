import React from 'react';

export const PageLoader: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-full py-20">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-highlight"></div>
        </div>
    );
};
