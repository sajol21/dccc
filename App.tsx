import React, { useContext, useState, useEffect, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { PageLoader } from './components/PageLoader';
import { Role } from './types';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const ShowcaseForm = lazy(() => import('./pages/ShowcaseForm'));
const Profile = lazy(() => import('./pages/Profile'));
const MemberProfile = lazy(() => import('./pages/MemberProfile'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Members = lazy(() => import('./pages/Members'));
const About = lazy(() => import('./pages/About'));
const Resources = lazy(() => import('./pages/Resources'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));

// Lazy-loaded admin pages
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const ManageSubmissions = lazy(() => import('./pages/admin/ManageSubmissions'));
const ManageUsers = lazy(() => import('./pages/admin/ManageUsers'));
const Announcements = lazy(() => import('./pages/admin/Announcements'));
const SiteSettings = lazy(() => import('./pages/admin/SiteSettings'));


// A wrapper for routes that require authentication.
const ProtectedRoute: React.FC<{ children: React.ReactElement, role?: Role }> = ({ children, role }) => {
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();
    
    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && currentUser.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const AppContent: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFading(true);
            setTimeout(() => setIsLoading(false), 500); // Wait for fade out animation
        }, 2000); // Simulate loading time

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Preloader fadingOut={isFading} />;
    }

    return (
        <HashRouter>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow pt-20">
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/leaderboard" element={<Leaderboard />} />
                            <Route path="/members" element={<Members />} />
                            <Route path="/members/:userId" element={<MemberProfile />} />
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
                                <Route path="settings" element={<SiteSettings />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
            </div>
        </HashRouter>
    );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </DataProvider>
  );
};

export default App;