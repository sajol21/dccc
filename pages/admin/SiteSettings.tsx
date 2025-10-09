import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';

export const SiteSettings: React.FC = () => {
    const { footerSettings, setFooterSettings } = useContext(DataContext);
    const [contactInfo, setContactInfo] = useState(footerSettings.contact);
    const [socialLinks, setSocialLinks] = useState(footerSettings.social);
    const [saved, setSaved] = useState(false);

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
    };

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFooterSettings({ contact: contactInfo, social: socialLinks });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div>
            <h1 className="text-4xl font-heading text-white mb-6 tracking-wider">Site Settings</h1>
            
            {saved && (
                <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-md relative mb-6">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> Settings have been saved.</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 glass-effect p-6 rounded-lg">
                <section>
                    <h2 className="text-2xl font-heading text-white mb-4 border-b border-accent/50 pb-2 tracking-wider">Footer Contact Info</h2>
                    <div className="space-y-4 max-w-lg">
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-text-primary mb-1">Address</label>
                            <input type="text" name="address" id="address" value={contactInfo.address} onChange={handleContactChange} className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">Email</label>
                            <input type="email" name="email" id="email" value={contactInfo.email} onChange={handleContactChange} className="form-input" />
                        </div>
                         <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1">Phone</label>
                            <input type="tel" name="phone" id="phone" value={contactInfo.phone} onChange={handleContactChange} className="form-input" />
                        </div>
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-heading text-white mb-4 border-b border-accent/50 pb-2 tracking-wider">Footer Social Links</h2>
                    <div className="space-y-4 max-w-lg">
                       <div>
                            <label htmlFor="facebook" className="block text-sm font-medium text-text-primary mb-1">Facebook URL</label>
                            <input type="url" name="facebook" id="facebook" value={socialLinks.facebook} onChange={handleSocialChange} className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="twitter" className="block text-sm font-medium text-text-primary mb-1">Twitter URL</label>
                            <input type="url" name="twitter" id="twitter" value={socialLinks.twitter} onChange={handleSocialChange} className="form-input" />
                        </div>
                        <div>
                            <label htmlFor="instagram" className="block text-sm font-medium text-text-primary mb-1">Instagram URL</label>
                            <input type="url" name="instagram" id="instagram" value={socialLinks.instagram} onChange={handleSocialChange} className="form-input" />
                        </div>
                    </div>
                </section>
                <div className="flex justify-end pt-4">
                    <button type="submit" className="btn btn-highlight">
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
};

const LazySiteSettings = () => <SiteSettings />;
export default LazySiteSettings;