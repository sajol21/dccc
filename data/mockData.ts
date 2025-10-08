import { User, Submission, LeaderboardEntry, Role, SubmissionType, SubmissionStatus, Notification, Event, Province, ArchivedLeaderboard } from '../types';

export const users: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@dccc.com', phone: '01000000000', batch: "HSC'N/A", province: Province.CULTURAL, role: Role.ADMIN },
  { id: 2, name: 'Zahir Raihan', email: 'zahir@dccc.com', phone: '01234567891', batch: "HSC'24", province: Province.CULTURAL, role: Role.EXECUTIVE_MEMBER },
];

export const submissions: Submission[] = [
  {
    id: 1,
    authorId: 2,
    title: 'The Digital Canvas',
    type: SubmissionType.WRITING,
    content: 'In the realm of bits and bytes, a new art is born. Pixels dance and algorithms sing, creating masterpieces unseen by the naked eye. This is the story of the digital canvas, where imagination knows no bounds and creativity is the only limit. We explore the intersection of technology and art...',
    description: 'An article on the rise of digital art.',
    status: SubmissionStatus.APPROVED,
    likes: 1,
    likedBy: [1],
    comments: [
      { id: 1, user: { name: 'Admin User', batch: "N/A" }, text: 'A fascinating read!', timestamp: new Date() },
    ],
    createdAt: new Date('2024-05-28T10:00:00Z'),
  },
  {
    id: 2,
    authorId: 2,
    title: 'City at Dusk',
    type: SubmissionType.IMAGE,
    content: 'https://picsum.photos/seed/city/800/600',
    description: 'A photo capturing the city lights as dusk settles.',
    status: SubmissionStatus.PENDING,
    likes: 0,
    likedBy: [],
    comments: [],
    createdAt: new Date('2024-05-29T11:00:00Z'),
  },
];


export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, memberId: 2, note: 'For outstanding contributions in creative writing.' },
];

export const previousLeaderboard: ArchivedLeaderboard = {
    month: "May",
    year: 2024,
    entries: [
        { rank: 1, memberId: 2, note: 'For an exceptional photography submission.' },
    ]
};


// FIX: Added mock events data.
export const events: Event[] = [
  {
    id: 1,
    title: 'Annual Cultural Fest 2024',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // ~30 days from now
    venue: 'Dhaka College Auditorium',
    description: 'The grandest cultural event of the year, showcasing talents from all departments. Join us for a day of music, dance, drama, and art.'
  },
  {
    id: 2,
    title: 'Poetry Night: Verses of the Monsoon',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // ~7 days from now
    venue: 'DCCC Club Room',
    description: 'An evening dedicated to the beauty of poetry, celebrating the monsoon season. All are welcome to recite or just listen.'
  }
];

export const notifications: Notification[] = [
    {id: 1, message: "Welcome to the DCCC Portal!", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)},
    {id: 3, message: "A new event 'Annual Cultural Fest 2024' has been added.", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 5)},
];

export const footerSettings = {
  contact: {
    address: 'Dhaka College, Dhaka-1205',
    email: 'contact@dccc.bd',
    phone: '+880 123 456 7890',
  },
  social: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
  }
};