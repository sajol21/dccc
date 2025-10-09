
export enum Role {
  ADMIN = 'Admin',
  EXECUTIVE_MEMBER = 'Executive Member',
  LIFETIME_MEMBER = 'Lifetime Member',
  ASSOCIATE_MEMBER = 'Associate Member',
  GENERAL_MEMBER = 'General Member',
  GENERAL_STUDENT = 'General Student',
}

export enum SubmissionType {
  WRITING = 'Writing',
  IMAGE = 'Image',
  VIDEO = 'Video',
}

export enum SubmissionStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export enum Province {
  CULTURAL = 'Cultural Province',
  TECHNICAL = 'Technical Province',
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  batch: string; // e.g., "HSC'25"
  province: Province;
  role: Role;
  isSuspended: boolean;
}

export interface Comment {
  id: number;
  user: {
    id: number;
    name: string;
    batch: string;
  };
  text: string;
  createdAt: Date;
}

export interface Submission {
  id: number;
  authorId: number;
  title: string;
  description: string;
  type: SubmissionType;
  content: string; // URL for image/video, text for writing
  likes: number;
  likedBy: number[]; // Array of user IDs
  comments: Comment[];
  createdAt: Date;
  status: SubmissionStatus;
}

export interface Event {
  id: number;
  title: string;
  date: Date;
  venue: string;
  description: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface LeaderboardEntry {
  rank: number;
  memberId: number;
  note: string;
}

export interface Leaderboard {
  month: string;
  year: number;
  entries: LeaderboardEntry[];
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
}

export interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
}

export interface FooterSettings {
  contact: ContactInfo;
  social: SocialLinks;
}

export interface GlobalNotification {
    id: number;
    message: string;
    createdAt: Date;
}
