
import React, { useContext, useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ShowcaseForm } from './pages/ShowcaseForm';
import { Profile } from './pages/Profile';
import { Leaderboard } from './pages/Leaderboard';
import { About } from './pages/About';
import { Resources } from './pages/Resources';
import { Role } from './types';

// New Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { ManageSubmissions } from './pages/admin/ManageSubmissions';
import { ManageUsers } from './pages/admin/ManageUsers';
import { Announcements } from './pages/admin/Announcements';


// A wrapper for routes that require authentication.
const ProtectedRoute: React.FC<{ children: React.ReactElement, role?: Role }> = ({ children, role }) => {
    const { currentUser } = useContext(AppContext);
    const location = useLocation();
    
    if (!currentUser) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This allows us to send them along to that page after they login.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && currentUser.role !== role) {
        // If the user has the wrong role, redirect to the homepage.
        return <Navigate to="/" replace />;
    }

    return children;
};


// --- Start of Auth Pages ---
// These components are defined here to avoid creating new files.

const Login: React.FC = () => {
    const { login } = useContext(AppContext);
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
                    <h1 className="text-2xl font-bold text-white mb-6">Welcome Back</h1>
                    {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">Email</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required
                                   className="block w-full bg-accent/50 border-gray-600/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight" />
                        </div>
                        <button type="submit" className="w-full justify-center py-3 px-4 border shadow-sm text-sm font-medium rounded-md text-white bg-highlight hover:bg-sky-400 transition-colors shadow-[0_0_20px_rgba(56,189,248,0.5)] focus:outline-none">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Register: React.FC = () => {
    const { registerUser } = useContext(AppContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', batch: '', department: ''
    });
    
    const inputClass = "block w-full bg-accent/50 border-gray-600/50 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-highlight placeholder-text-secondary/50";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(registerUser(formData)) {
            navigate('/');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-12">
            <div className="w-full max-w-lg">
                <div className="glass-effect p-8 rounded-xl shadow-xl">
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Create Your Account</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                         <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className={inputClass} />
                         <input type="email" name="email" placeholder="Email" onChange={handleChange} required className={inputClass} />
                         <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required className={inputClass} />
                         <input type="text" name="batch" placeholder="Batch (e.g., HSC'25)" onChange={handleChange} required className={inputClass} />
                         <input type="text" name="department" placeholder="Department (e.g., Science)" onChange={handleChange} required className={inputClass} />
                         <button type="submit" className="w-full mt-4 justify-center py-3 px-4 border shadow-sm text-sm font-medium rounded-md text-white bg-highlight hover:bg-sky-400 transition-colors shadow-[0_0_20px_rgba(56,189,248,0.5)] focus:outline-none">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
// --- End of Auth Pages ---


const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow pt-20">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/resources" element={<Resources />} />

              {/* Protected Routes for Logged-in Users */}
              <Route path="/showcase" element={<ProtectedRoute><ShowcaseForm /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              
              {/* Protected Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute role={Role.ADMIN}><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<AdminOverview />} />
                  <Route path="submissions" element={<ManageSubmissions />} />
                  <Route path="users" element={<ManageUsers />} />
                  <Route path="announcements" element={<Announcements />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;