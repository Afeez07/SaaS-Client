export interface Project {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  amount: string;
  progress: number;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  frequency: string;
  amount: string;
}

export interface Payment {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: string;
}

export interface SupportComment {
  id: string;
  text: string;
  author: string;
  date: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  category: string;
  date: string;
  comments: SupportComment[];
  active: boolean;
}
