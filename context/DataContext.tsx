import React, { createContext, ReactNode, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { 
    User, Submission, Event, LeaderboardEntry, Leaderboard, FooterSettings, Role, SubmissionStatus, Comment, Activity, GlobalNotification 
} from '../types';
import { 
    mockUsers, mockSubmissions, mockEvents, mockLeaderboard, mockPreviousLeaderboard, mockFooterSettings, mockActivities 
} from '../data/mockData';

interface DataContextType {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    submissions: Submission[];
    events: Event[];
    activities: Activity[];
    leaderboard: LeaderboardEntry[];
    setLeaderboard: React.Dispatch<React.SetStateAction<LeaderboardEntry[]>>;
    previousLeaderboard: Leaderboard | null;
    footerSettings: FooterSettings;
    setFooterSettings: React.Dispatch<React.SetStateAction<FooterSettings>>;
    globalNotifications: GlobalNotification[];
    
    getUserById: (id: number) => User | undefined;
    
    addSubmission: (submission: Omit<Submission, 'id' | 'authorId' | 'likes' | 'likedBy' | 'comments' | 'createdAt' | 'status'>, authorId: number) => void;
    updateSubmissionStatus: (submissionId: number, status: SubmissionStatus) => void;
    updateSubmission: (submission: Submission) => void;
    deleteSubmission: (submissionId: number) => void;

    addComment: (submissionId: number, text: string, user: { id: number; name: string; batch: string; }) => void;
    toggleAppreciation: (submissionId: number, userId: number) => void;
    
    updateUser: (user: User) => void;
    updateUserRole: (userId: number, role: Role) => void;
    toggleUserSuspension: (userId: number) => void;

    addEvent: (event: Omit<Event, 'id'>) => void;
    updateEvent: (event: Event) => void;
    deleteEvent: (eventId: number) => void;
    
    addActivity: (activity: Omit<Activity, 'id'>) => void;
    updateActivity: (activity: Activity) => void;
    deleteActivity: (activityId: number) => void;

    addGlobalNotification: (message: string) => void;
}

export const DataContext = createContext<DataContextType>(null!);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useLocalStorage<User[]>('dccc-users', mockUsers);
    const [submissions, setSubmissions] = useLocalStorage<Submission[]>('dccc-submissions', mockSubmissions);
    const [events, setEvents] = useLocalStorage<Event[]>('dccc-events', mockEvents);
    const [activities, setActivities] = useLocalStorage<Activity[]>('dccc-activities', mockActivities);
    const [leaderboard, setLeaderboard] = useLocalStorage<LeaderboardEntry[]>('dccc-leaderboard', mockLeaderboard);
    const [previousLeaderboard] = useLocalStorage<Leaderboard | null>('dccc-prev-leaderboard', mockPreviousLeaderboard);
    const [footerSettings, setFooterSettings] = useLocalStorage<FooterSettings>('dccc-footer', mockFooterSettings);
    const [globalNotifications, setGlobalNotifications] = useLocalStorage<GlobalNotification[]>('dccc-notifications', []);

    const getUserById = useCallback((id: number) => users.find(user => user.id === id), [users]);

    const addSubmission = useCallback((submissionData: Omit<Submission, 'id' | 'authorId' | 'likes' | 'likedBy' | 'comments' | 'createdAt' | 'status'>, authorId: number) => {
        const newSubmission: Submission = {
            ...submissionData,
            id: submissions.length > 0 ? Math.max(...submissions.map(s => s.id)) + 1 : 1,
            authorId,
            likes: 0,
            likedBy: [],
            comments: [],
            createdAt: new Date(),
            status: SubmissionStatus.PENDING,
        };
        setSubmissions(prev => [...prev, newSubmission]);
    }, [submissions, setSubmissions]);

    const updateSubmissionStatus = useCallback((submissionId: number, status: SubmissionStatus) => {
        setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, status } : s));
    }, [setSubmissions]);
    
    const updateSubmission = useCallback((submission: Submission) => {
        setSubmissions(prev => prev.map(s => s.id === submission.id ? submission : s));
    }, [setSubmissions]);

    const deleteSubmission = useCallback((submissionId: number) => {
        setSubmissions(prev => prev.filter(s => s.id !== submissionId));
    }, [setSubmissions]);
    
    const addComment = useCallback((submissionId: number, text: string, user: { id: number; name: string; batch: string; }) => {
        const newComment: Comment = {
            id: Date.now(),
            user,
            text,
            createdAt: new Date(),
        };
        setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, comments: [...s.comments, newComment] } : s));
    }, [setSubmissions]);
    
    const toggleAppreciation = useCallback((submissionId: number, userId: number) => {
        setSubmissions(prev => prev.map(s => {
            if (s.id === submissionId) {
                const liked = s.likedBy.includes(userId);
                return {
                    ...s,
                    likes: liked ? s.likes - 1 : s.likes + 1,
                    likedBy: liked ? s.likedBy.filter(id => id !== userId) : [...s.likedBy, userId],
                };
            }
            return s;
        }));
    }, [setSubmissions]);

    const updateUser = useCallback((userToUpdate: User) => {
         setUsers(prev => prev.map(u => u.id === userToUpdate.id ? userToUpdate : u));
    }, [setUsers]);

    const updateUserRole = useCallback((userId: number, role: Role) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
    }, [setUsers]);

    const toggleUserSuspension = useCallback((userId: number) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, isSuspended: !u.isSuspended } : u));
    }, [setUsers]);

    const addEvent = useCallback((eventData: Omit<Event, 'id'>) => {
        const newEvent: Event = {
            ...eventData,
            id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
        };
        setEvents(prev => [...prev, newEvent].sort((a,b) => a.date.getTime() - b.date.getTime()));
    }, [events, setEvents]);

    const updateEvent = useCallback((event: Event) => {
        setEvents(prev => prev.map(e => e.id === event.id ? event : e).sort((a,b) => a.date.getTime() - b.date.getTime()));
    }, [setEvents]);

    const deleteEvent = useCallback((eventId: number) => {
        setEvents(prev => prev.filter(e => e.id !== eventId));
    }, [setEvents]);
    
    const addActivity = useCallback((activityData: Omit<Activity, 'id'>) => {
        const newActivity: Activity = {
            ...activityData,
            id: activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1,
        };
        setActivities(prev => [...prev, newActivity]);
    }, [activities, setActivities]);

    const updateActivity = useCallback((activity: Activity) => {
        setActivities(prev => prev.map(a => a.id === activity.id ? activity : a));
    }, [setActivities]);

    const deleteActivity = useCallback((activityId: number) => {
        setActivities(prev => prev.filter(a => a.id !== activityId));
    }, [setActivities]);
    
    const addGlobalNotification = useCallback((message: string) => {
        const newNotif: GlobalNotification = {
            id: Date.now(),
            message,
            createdAt: new Date(),
        };
        setGlobalNotifications(prev => [newNotif, ...prev]);
    }, [setGlobalNotifications]);

    const value = {
        users, setUsers, submissions, events, activities, leaderboard, setLeaderboard, previousLeaderboard, footerSettings, setFooterSettings, globalNotifications,
        getUserById, addSubmission, updateSubmissionStatus, updateSubmission, deleteSubmission, addComment, toggleAppreciation,
        updateUser, updateUserRole, toggleUserSuspension, addEvent, updateEvent, deleteEvent, addActivity, updateActivity, deleteActivity, addGlobalNotification,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};