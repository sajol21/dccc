
export enum Role {
  GENERAL_STUDENT = 'General Student',
  GENERAL_MEMBER = 'General Member',
  ASSOCIATE_MEMBER = 'Associate Member',
  EXECUTIVE_MEMBER = 'Executive Member',
  LIFETIME_MEMBER = 'Lifetime Member',
  ADMIN = 'Admin',
}

export enum SubmissionType {
  WRITING = 'Article/Writing',
  IMAGE = 'Image Link',
  VIDEO = 'Video Link',
}

export enum SubmissionStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  batch: string;
  department: string;
  role: Role;
}

export interface Comment {
  id: number;
  user: Pick<User, 'name' | 'batch'>;
  text: string;
  timestamp: Date;
}

export interface Submission {
  id: number;
  authorId: number;
  title: string;
  type: SubmissionType;
  content: string; // Text for writing, URL for image/video
  description: string;
  status: SubmissionStatus;
  likes: number;
  comments: Comment[];
  createdAt: Date;
}

export interface LeaderboardEntry {
  rank: number;
  memberId: number;
  note: string;
}

// FIX: Added Event interface to define the shape of event objects.
export interface Event {
  id: number;
  title: string;
  date: Date;
  venue: string;
  description: string;
}

export interface Notification {
  id: number;
  message: string;
  read: boolean;
  createdAt: Date;
}