
import React, { Suspense, useContext, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthContext } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageLoader } from './components/PageLoader';
import { Role } from './types';
import { Preloader } from './components/Preloader';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Activities = React.lazy(() => import('./pages/Activities'));
const Leaderboard = React.lazy(() => import('./pages/Leaderboard'));
const Members = React.lazy(() => import('./pages/Members'));
const MemberProfile = React.lazy(() => import('./pages/MemberProfile'));
const Events = React.lazy(() => import('./pages/Events'));
const About = React.lazy(() => import('./pages/About'));
const Resources = React.lazy(() => import('./pages/Resources'));
const ShowcaseForm = React.lazy(() => import('./pages/ShowcaseForm'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));

// Lazy load admin pages
const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout'));
const AdminOverview = React.lazy(() => import('./pages/admin/AdminOverview'));
const ManageSubmissions = React.lazy(() => import('./pages/admin/ManageSubmissions'));
const ManageUsers = React.lazy(() => import('./pages/admin/ManageUsers'));
const ManageEvents = React.lazy(() => import('./pages/admin/ManageEvents'));
const ManageActivities = React.lazy(() => import('./pages/admin/ManageActivities'));
const SiteSettings = React.lazy(() => import('./pages/admin/SiteSettings'));
const Announcements = React.lazy(() => import('./pages/admin/Announcements'));

const MainLayout: React.FC = () => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
                <Outlet />
            </Suspense>
        </main>
        <Footer />
    </div>
);

const AdminRoute: React.FC = () => {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) return <Navigate to="/login" replace />;
    if (currentUser.role !== Role.ADMIN) return <Navigate to="/" replace />;
    return (
        <Suspense fallback={<PageLoader />}>
            <Outlet />
        </Suspense>
    );
};

const AuthenticatedRoute: React.FC = () => {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) return <Navigate to="/login" replace />;
    return (
        <Suspense fallback={<PageLoader />}>
            <Outlet />
        </Suspense>
    );
};


const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [fadingOut, setFadingOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadingOut(true);
            setTimeout(() => setLoading(false), 500); // Wait for fade out animation
        }, 1500); // Preloader duration

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Preloader fadingOut={fadingOut} />;
    }

    return (
        <AppProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="activities" element={<Activities />} />
                        <Route path="leaderboard" element={<Leaderboard />} />
                        <Route path="members" element={<Members />} />
                        <Route path="members/:userId" element={<MemberProfile />} />
                        <Route path="events" element={<Events />} />
                        <Route path="about" element={<About />} />
                        <Route path="resources" element={<Resources />} />
                        
                        <Route element={<AuthenticatedRoute />}>
                            <Route path="showcase" element={<ShowcaseForm />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                    </Route>
                    
                    <Route path="/admin" element={<AdminRoute />}>
                        <Route element={<AdminLayout/>}>
                            <Route index element={<Navigate to="overview" replace />} />
                            <Route path="overview" element={<AdminOverview />} />
                            <Route path="submissions" element={<ManageSubmissions />} />
                            <Route path="users" element={<ManageUsers />} />
                            <Route path="events" element={<ManageEvents />} />
                            <Route path="activities" element={<ManageActivities />} />
                            <Route path="settings" element={<SiteSettings />} />
                            <Route path="announcements" element={<Announcements />} />
                        </Route>
                    </Route>

                    <Route path="/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
                    <Route path="/register" element={<Suspense fallback={<PageLoader />}><Register /></Suspense>} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AppProvider>
    );
};

export default App;