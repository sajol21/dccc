import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login: React.FC = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (login(email)) {
            navigate(from, { replace: true });
        } else {
            setError('Invalid email or user not found.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md">
                <div className="glass-effect p-8 rounded-xl shadow-xl text-center">
                    <h1 className="text-4xl font-heading text-white mb-6 tracking-wider">Welcome Back</h1>
                    {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">Email</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required
                                   className="block w-full bg-accent/50 border-gray-600/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight" />
                        </div>
                        <button type="submit" className="w-full justify-center py-3 px-4 border shadow-sm text-sm font-semibold rounded-md text-primary bg-highlight hover:bg-amber-300 transition-colors shadow-[0_0_20px_rgba(251,191,36,0.4)] focus:outline-none">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const LazyLogin = () => <Login />;
export default LazyLogin;