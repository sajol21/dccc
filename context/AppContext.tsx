import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Submission, LeaderboardEntry, Role, SubmissionStatus, Comment, Notification, Event } from '../types';
import * as mock from '../data/mockData';

// --- Start of useLocalStorage Hook ---
// A custom hook to keep state in sync with localStorage.
function getStorageValue<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        // We use a reviver to parse date strings back into Date objects.
        return JSON.parse(saved, (k, v) => {
            if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(v)) {
                return new Date(v);
            }
            return v;
        });
      } catch(e) {
        console.error("Failed to parse localStorage item", e);
        return defaultValue;
      }
    }
  }
  return defaultValue;
}

export const useLocalStorage = <T,>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
// --- End of useLocalStorage Hook ---


interface AppContextType {
  currentUser: User | null;
  users: User[];
  submissions: Submission[];
  leaderboard: LeaderboardEntry[];
  notifications: Notification[];
  // FIX: Added event-related properties to the context type.
  events: Event[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
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
  login: (email: string) => boolean;
  logout: () => void;
  registerUser: (user: Omit<User, 'id' | 'role'>) => boolean;
}

export const AppContext = createContext<AppContextType>(null!);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useLocalStorage<User[]>('dccc-users', mock.users);
  const [submissions, setSubmissions] = useLocalStorage<Submission[]>('dccc-submissions', mock.submissions);
  const [leaderboard, setLeaderboard] = useLocalStorage<LeaderboardEntry[]>('dccc-leaderboard', mock.leaderboard);
  const [notifications, setNotifications] = useLocalStorage<Notification[]>('dccc-notifications', mock.notifications);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('dccc-currentUser', null);
  // FIX: Added events state management.
  const [events, setEvents] = useLocalStorage<Event[]>('dccc-events', mock.events);

  const login = (email: string): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerUser = (userData: Omit<User, 'id' | 'role'>): boolean => {
      const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (existingUser) {
          alert('An account with this email already exists.');
          return false;
      }
      const newUser: User = {
          ...userData,
          id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
          role: Role.GENERAL_STUDENT,
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      return true;
  };

  const getUserById = (id: number) => users.find(u => u.id === id);

  const addSubmission = (submission: Omit<Submission, 'id' | 'authorId' | 'status' | 'likes' | 'comments' | 'createdAt'>) => {
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
      // This is a simplified way to add a notification for all users.
      // In a real app, this would be handled differently.
      // Here, we add it to the general pool, and the UI filters it.
      // For this demo, let's assume it appears for everyone.
      setNotifications(prev => [newNotification, ...prev]);
  };

  // FIX: Added event management functions.
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
    currentUser,
    users,
    submissions,
    leaderboard,
    notifications,
    events,
    setNotifications,
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
    login,
    logout,
    registerUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};