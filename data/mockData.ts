
import { Role, SubmissionType, SubmissionStatus, Province, User, Submission, Event, LeaderboardEntry, Leaderboard, FooterSettings, Activity } from '../types';

export const mockUsers: User[] = [
  { id: 1, name: 'Samin Yasar', email: 'admin@dccc.com', phone: '01234567890', batch: "HSC'24", province: Province.TECHNICAL, role: Role.ADMIN, isSuspended: false },
  { id: 2, name: 'Jane Doe', email: 'jane.doe@dccc.com', phone: '01234567891', batch: "HSC'24", province: Province.CULTURAL, role: Role.EXECUTIVE_MEMBER, isSuspended: false },
  { id: 3, name: 'John Smith', email: 'john.smith@dccc.com', phone: '01234567892', batch: "HSC'25", province: Province.TECHNICAL, role: Role.LIFETIME_MEMBER, isSuspended: false },
  { id: 4, name: 'Emily White', email: 'emily.white@dccc.com', phone: '01234567893', batch: "HSC'25", province: Province.CULTURAL, role: Role.GENERAL_MEMBER, isSuspended: false },
  { id: 5, name: 'Michael Brown', email: 'michael.brown@dccc.com', phone: '01234567894', batch: "HSC'26", province: Province.TECHNICAL, role: Role.GENERAL_STUDENT, isSuspended: false },
  { id: 6, name: 'Jessica Green', email: 'jessica.green@dccc.com', phone: '01234567895', batch: "HSC'24", province: Province.CULTURAL, role: Role.EXECUTIVE_MEMBER, isSuspended: true },
];

export const mockSubmissions: Submission[] = [
  {
    id: 1, authorId: 2, title: 'Campus in Monsoon', description: 'A short poem about the rainy season at Dhaka College.', type: SubmissionType.WRITING,
    content: 'Clouds gather, a somber grey hue,\nWhispers of rain, fresh and new.\nThe red buildings stand, washed and bright,\nA painter\'s dream, a beautiful sight.',
    likes: 25, likedBy: [1, 3, 4], comments: [{ id: 1, user: { id: 3, name: 'John Smith', batch: "HSC'25" }, text: 'Beautifully written!', createdAt: new Date() }],
    createdAt: new Date('2024-07-20T10:00:00Z'), status: SubmissionStatus.APPROVED
  },
  {
    id: 2, authorId: 3, title: 'The Lone Banyan', description: 'Photo of the iconic banyan tree near the auditorium.', type: SubmissionType.IMAGE,
    content: 'https://images.unsplash.com/photo-1561253336-f786f34558e8?q=80&w=2070&auto=format&fit=crop',
    likes: 42, likedBy: [1, 2, 4, 5], comments: [], createdAt: new Date('2024-07-19T15:30:00Z'), status: SubmissionStatus.APPROVED
  },
  {
    id: 3, authorId: 4, title: 'Annual Cultural Fest Highlights', description: 'A quick montage of the best moments from last year\'s fest.', type: SubmissionType.VIDEO,
    content: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    likes: 58, likedBy: [1, 2, 3], comments: [], createdAt: new Date('2024-07-18T09:00:00Z'), status: SubmissionStatus.APPROVED
  },
  {
    id: 4, authorId: 5, title: 'Thoughts on Modernism', description: 'An essay exploring the impact of modernism on Bengali literature.', type: SubmissionType.WRITING,
    content: 'Modernism in Bengali literature was a revolutionary movement...',
    likes: 0, likedBy: [], comments: [], createdAt: new Date('2024-07-21T11:00:00Z'), status: SubmissionStatus.PENDING
  },
];

export const mockEvents: Event[] = [
    { id: 1, title: 'Poetry Recitation Workshop', date: new Date(new Date().setDate(new Date().getDate() + 10)), venue: 'College Auditorium', description: 'Join us to learn the art of poetry recitation from renowned artists.' },
    { id: 2, title: 'Annual Photography Exhibition', date: new Date(new Date().setDate(new Date().getDate() + 25)), venue: 'Main Building Hall', description: 'Showcasing the best clicks from our talented members.' },
];

export const mockActivities: Activity[] = [
    { id: 1, title: 'Debate Club', description: 'Weekly debate sessions on contemporary topics.', imageUrl: 'https://images.unsplash.com/photo-1589995138622-18be969d1232?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, title: 'Music Wing', description: 'Practice sessions for vocalists and instrumentalists.', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop' },
];

export const mockLeaderboard: LeaderboardEntry[] = [
    { rank: 1, memberId: 3, note: 'Exceptional photography and active participation.' },
    { rank: 2, memberId: 2, note: 'Consistent high-quality literary contributions.' },
    { rank: 3, memberId: 4, note: 'Creative video editing and great potential.' },
];

export const mockPreviousLeaderboard: Leaderboard = {
    month: 'June',
    year: new Date().getFullYear(),
    entries: [
        { rank: 1, memberId: 2, note: 'Outstanding performance in the debate competition.' },
        { rank: 2, memberId: 3, note: 'Winner of the monthly photography contest.' },
        { rank: 3, memberId: 1, note: 'Active involvement in organizing events.' },
    ]
};

export const mockFooterSettings: FooterSettings = {
    contact: {
        address: 'Dhaka College, New Market, Dhaka-1205',
        email: 'contact@dccc.com',
        phone: '+880 1234 567890',
    },
    social: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
    }
};
