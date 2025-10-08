import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Province } from '../../types';

const Register: React.FC = () => {
    const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', province: Province.CULTURAL
    });
    const [batchYear, setBatchYear] = useState('');
    
    const inputClass = "block w-full bg-accent/50 border-gray-600/50 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight placeholder-text-secondary/50";
    const selectClass = "block w-full bg-accent/50 border-gray-600/50 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleBatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBatchYear(e.target.value.replace(/[^0-9]/g, ''));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullBatch = `HSC'${batchYear}`;
        if(registerUser({ ...formData, batch: fullBatch })) {
            navigate('/');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-12">
            <div className="w-full max-w-lg">
                <div className="glass-effect p-8 rounded-xl shadow-xl">
                    <h1 className="text-4xl font-heading text-white mb-6 text-center tracking-wider">Create Your Account</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                         <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className={inputClass} />
                         <input type="email" name="email" placeholder="Email" onChange={handleChange} required className={inputClass} />
                         <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required className={inputClass} />
                         <div className="flex items-stretch">
                            <span className="inline-flex items-center px-3 rounded-l-md bg-accent/50 border border-r-0 border-gray-600/50 text-text-secondary">HSC'</span>
                            <input type="text" value={batchYear} onChange={handleBatchChange} placeholder="25" required className={`${inputClass} rounded-l-none`} />
                         </div>
                         <select name="province" value={formData.province} onChange={handleChange} required className={selectClass}>
                            <option value={Province.CULTURAL} className="bg-secondary">Cultural Province</option>
                            <option value={Province.TECHNICAL} className="bg-secondary">Technical Province</option>
                         </select>
                         <button type="submit" className="w-full mt-4 justify-center py-3 px-4 border shadow-sm text-sm font-semibold rounded-md text-primary bg-highlight hover:bg-amber-300 transition-colors shadow-[0_0_20px_rgba(251,191,36,0.4)] focus:outline-none">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const LazyRegister = () => <Register />;
export default LazyRegister;