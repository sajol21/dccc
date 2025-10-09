import React, { useContext, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
        const result = login(email);
        
        if (result === 'success') {
            navigate(from, { replace: true });
        } else if (result === 'suspended') {
            setError('Your account has been suspended by an administrator.');
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
                                   className="form-input" />
                        </div>
                        <button type="submit" className="w-full btn btn-highlight">
                            Login
                        </button>
                    </form>
                     <p className="text-sm text-center text-text-secondary mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-highlight hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const LazyLogin = () => <Login />;
export default LazyLogin;