import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { User, Submission, LeaderboardEntry, Role, SubmissionStatus, Comment, Notification, Event, ArchivedLeaderboard } from '../types';
import * as mock from '../data/mockData';
import { useLocalStorage, getStorageValue } from './useLocalStorage';

export interface FooterSettings {
  contact: {
    address: string;
    email: string;
    phone: string;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
}

interface DataContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  submissions: Submission[];
  leaderboard: LeaderboardEntry[];
  previousLeaderboard: ArchivedLeaderboard | null;
  notifications: Notification[];
  events: Event[];
  footerSettings: FooterSettings;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  setFooterSettings: React.Dispatch<React.SetStateAction<FooterSettings>>;
  getUserById: (id: number) => User | undefined;
  addSubmission: (submission: Omit<Submission, 'id' | 'authorId' | 'status' | 'likes' | 'comments' | 'createdAt'>) => void;
  updateSubmissionStatus: (id: number, status: SubmissionStatus) => void;
  updateSubmission: (submission: Submission) => void;
  deleteSubmission: (id: number) => void;
  updateUserRole: (id: number, role: Role) => void;
  addComment: (submissionId: number, text: string) => void;
  updateLikes: (submissionId: number, newLikes: number) => void;
  setLeaderboard: React.Dispatch<React.SetStateAction<LeaderboardEntry[]>>;
  addGlobalNotification: (message: string) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
  updateCurrentUser: (updatedData: Partial<Omit<User, 'id' | 'email' | 'role'>>) => void;
}

export const DataContext = createContext<DataContextType>(null!);

// AuthContext needs currentUser from its own scope, which is tricky. Let's get it from localStorage directly for this.
const getCurrentUserFromStorage = (): User | null => getStorageValue('dccc-currentUser', null);


export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useLocalStorage<User[]>('dccc-users', mock.users);
  const [submissions, setSubmissions] = useLocalStorage<Submission[]>('dccc-submissions', mock.submissions);
  const [leaderboard, setLeaderboard] = useLocalStorage<LeaderboardEntry[]>('dccc-leaderboard', mock.leaderboard);
  const [previousLeaderboard, setPreviousLeaderboard] = useLocalStorage<ArchivedLeaderboard | null>('dccc-previous-leaderboard', mock.previousLeaderboard);
  const [notifications, setNotifications] = useLocalStorage<Notification[]>('dccc-notifications', mock.notifications);
  const [events, setEvents] = useLocalStorage<Event[]>('dccc-events', mock.events);
  const [footerSettings, setFooterSettings] = useLocalStorage<FooterSettings>('dccc-footer-settings', mock.footerSettings);

  useEffect(() => {
    const lastResetMonth = getStorageValue<number | null>('dccc-last-reset-month', null);
    const currentMonth = new Date().getMonth();

    if (lastResetMonth !== currentMonth) {
      if(leaderboard.length > 0) {
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        const monthName = lastMonthDate.toLocaleString('default', { month: 'long' });
        
        const archive: ArchivedLeaderboard = {
          month: monthName,
          year: lastMonthDate.getFullYear(),
          entries: [...leaderboard]
        };
        setPreviousLeaderboard(archive);
      }
      
      setLeaderboard([]);
      localStorage.setItem('dccc-last-reset-month', JSON.stringify(currentMonth));
    }
  }, []);

  const updateCurrentUser = (updatedData: Partial<Omit<User, 'id' | 'email' | 'role'>>) => {
    const currentUser = getCurrentUserFromStorage();
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updatedData };
    // This is a bit of a hack to update another context's storage, but necessary with this split
    localStorage.setItem('dccc-currentUser', JSON.stringify(updatedUser));
    setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? updatedUser : u));
  };


  const getUserById = (id: number) => users.find(u => u.id === id);

  const addSubmission = (submission: Omit<Submission, 'id' | 'authorId' | 'status' | 'likes' | 'comments' | 'createdAt'>) => {
    const currentUser = getCurrentUserFromStorage();
    if (!currentUser) return;
    const newSubmission: Submission = {
      ...submission,
      id: submissions.length > 0 ? Math.max(...submissions.map(s => s.id)) + 1 : 1,
      authorId: currentUser.id,
      status: SubmissionStatus.PENDING,
      likes: 0,
      comments: [],
      createdAt: new Date(),
    };
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  const updateSubmissionStatus = (id: number, status: SubmissionStatus) => {
    setSubmissions(subs => subs.map(s => s.id === id ? { ...s, status } : s));
    const submission = submissions.find(s => s.id === id);
    if(submission) {
        setNotifications(prev => [{
            id: Date.now(),
            message: `Your submission '${submission.title}' has been ${status.toLowerCase()}.`,
            read: false,
            createdAt: new Date(),
            userId: submission.authorId,
        }, ...prev]);
    }
  };

  const updateSubmission = (updatedSubmission: Submission) => {
    setSubmissions(prev => prev.map(s => s.id === updatedSubmission.id ? updatedSubmission : s));
  };

  const deleteSubmission = (id: number) => {
    setSubmissions(currentSubmissions =>
      currentSubmissions.filter(submission => submission.id !== id)
    );
  };

  const updateUserRole = (id: number, role: Role) => {
    setUsers(usrs => usrs.map(u => u.id === id ? { ...u, role } : u));
  };

  const addComment = (submissionId: number, text: string) => {
    const currentUser = getCurrentUserFromStorage();
    if (!currentUser) return;
    const newComment: Comment = {
      id: Date.now(),
      user: { name: currentUser.name, batch: currentUser.batch },
      text,
      timestamp: new Date()
    };
    setSubmissions(subs => subs.map(s => s.id === submissionId ? { ...s, comments: [newComment, ...s.comments] } : s));
  };

  const updateLikes = (submissionId: number, newLikes: number) => {
     setSubmissions(subs => subs.map(s => s.id === submissionId ? { ...s, likes: newLikes } : s));
  };

  const addGlobalNotification = (message: string) => {
      const newNotification: Notification = {
          id: Date.now(),
          message,
          read: false,
          createdAt: new Date(),
      };
      setNotifications(prev => [newNotification, ...prev]);
  };

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
    };
    setEvents(prev => [newEvent, ...prev]);
    addGlobalNotification(`A new event has been added: ${newEvent.title}`);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const deleteEvent = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const value = {
    users,
    setUsers,
    submissions,
    leaderboard,
    previousLeaderboard,
    notifications,
    events,
    footerSettings,
    setNotifications,
    setFooterSettings,
    getUserById,
    addSubmission,
    updateSubmissionStatus,
    updateSubmission,
    deleteSubmission,
    updateUserRole,
    addComment,
    updateLikes,
    setLeaderboard,
    addGlobalNotification,
    addEvent,
    updateEvent,
    deleteEvent,
    updateCurrentUser,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};