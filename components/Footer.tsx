import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const SocialIcon: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-highlight transition-colors">
    {children}
  </a>
);

export const Footer: React.FC = () => {
  const { footerSettings } = useContext(DataContext);
  
  return (
    <footer className="glass-effect mt-24 border-t border-accent/50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <NavLink to="/" className="flex items-center space-x-2">
              <img src="https://res.cloudinary.com/dabfeqgsj/image/upload/v1759778648/cyizstrjgcq0w9fr8cxp.png" alt="DCCC Logo" className="h-10 w-auto" />
              <span className="font-bold text-white text-lg">DCCC</span>
            </NavLink>
            <p className="text-text-secondary text-sm">
              Fostering creativity and celebrating the vibrant culture within Dhaka College.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-text-primary">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><NavLink to="/about" className="text-sm text-text-secondary hover:text-text-primary">About Us</NavLink></li>
              <li><NavLink to="/" className="text-sm text-text-secondary hover:text-text-primary">Showcase</NavLink></li>
              <li><NavLink to="/activities" className="text-sm text-text-secondary hover:text-text-primary">Activities</NavLink></li>
              <li><NavLink to="/leaderboard" className="text-sm text-text-secondary hover:text-text-primary">Leaderboard</NavLink></li>
              <li><NavLink to="/resources" className="text-sm text-text-secondary hover:text-text-primary">Resources</NavLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-text-primary">Contact Us</h3>
            <address className="mt-4 space-y-2 text-sm text-text-secondary not-italic">
              <p>{footerSettings.contact.address}</p>
              <p>Email: {footerSettings.contact.email}</p>
              <p>Phone: {footerSettings.contact.phone}</p>
            </address>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-text-primary">Follow Us</h3>
            <div className="flex mt-4 space-x-4">
               <SocialIcon href={footerSettings.social.facebook}>
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
               </SocialIcon>
               <SocialIcon href={footerSettings.social.twitter}>
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
               </SocialIcon>
               <SocialIcon href={footerSettings.social.instagram}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm0 1.623c-2.403 0-2.748.01-3.728.058-1.024.048-1.62.198-2.036.36-1.01.4-1.63.9-2.228 1.49-1.01.9-1.63 2.1-2.228 3.51-.16.4-.312 1.01-.36 2.036-.048.98-.058 1.325-.058 3.728s.01 2.748.058 3.728c.048 1.024.198 1.62.36 2.036.4.9.9 1.63 1.49 2.228.9.9 2.1 1.63 3.51 2.228.4.16 1.01.312 2.036.36.98.048 1.325.058 3.728.058s2.748-.01 3.728-.058c1.024-.048 1.62-.198 2.036.36 1.01-.4 1.63-.9 2.228-1.49.9-1.01 1.63-2.1 2.228-3.51.16-.4.312-1.01.36-2.036.048-.98.058-1.325.058-3.728s-.01-2.748-.058-3.728c-.048-1.024-.198-1.62-.36-2.036-.4-1.01-.9-1.63-1.49-2.228-1.01-.9-2.1-1.63-3.51-2.228-.4-.16-1.01-.312-2.036.36-.98-.048-1.325.058-3.728-.058zm0 4.25a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 1.623a4.539 4.539 0 110 9.078 4.539 4.539 0 010-9.078zm6.57-4.668a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" clipRule="evenodd" /></svg>
               </SocialIcon>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-accent/50 pt-8 text-center">
          <p className="text-sm text-text-secondary">&copy; {new Date().getFullYear()} Dhaka College Cultural Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};