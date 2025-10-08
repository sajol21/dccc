import React from 'react';

export const Preloader: React.FC<{ fadingOut: boolean }> = ({ fadingOut }) => {
    return (
        <div className={`preloader ${fadingOut ? 'fade-out' : ''}`}>
            <img 
                src="https://res.cloudinary.com/dabfeqgsj/image/upload/v1759778648/cyizstrjgcq0w9fr8cxp.png" 
                alt="DCCC Logo" 
                className="h-24 w-auto preloader-logo" 
            />
        </div>
    );
};
