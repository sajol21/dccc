import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Province } from '../../types';

const Register: React.FC = () => {
    const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', province: Province.CULTURAL
    });
    const [batchYear, setBatchYear] = useState('');

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
                         <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="form-input" />
                         <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="form-input" />
                         <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required className="form-input" />
                         <div className="flex items-stretch">
                            <span className="inline-flex items-center px-3 rounded-l-md bg-accent/50 border border-r-0 border-accent text-text-secondary">HSC'</span>
                            <input type="text" value={batchYear} onChange={handleBatchChange} placeholder="25" required className="form-input rounded-l-none" />
                         </div>
                         <select name="province" value={formData.province} onChange={handleChange} required className="form-select">
                            <option value={Province.CULTURAL}>Cultural Province</option>
                            <option value={Province.TECHNICAL}>Technical Province</option>
                         </select>
                         <button type="submit" className="w-full mt-4 btn btn-highlight">
                            Register
                        </button>
                    </form>
                     <p className="text-sm text-center text-text-secondary mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-highlight hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const LazyRegister = () => <Register />;
export default LazyRegister;