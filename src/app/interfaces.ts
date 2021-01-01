export interface SelfProfile {
  uuid: string;
  username: string;
  email: string;
  description: string;
  password: string;
  courses: Course[];
  rate: number;
}

export interface Login {
  email: string;
  password: string;
}

export interface Course {
  id: number;
  coursename: string;
  description: string;
  category: Category;
  rate: number;
  ownername: string;
}
export interface Category {
  name: string;
  imageUrl: string;
}
export interface UsersProfile {
  rate: number;
  username: string;
  email: string;
  description: string;
  courses: Course[];
}

export interface Video {
  id: number;
  name: string;
  description: string;
  videoUrl: string;
  imagePreview: string;
  rate: number;
}

export interface VideoFeed {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  imagePreview: string;
  rate: number;
  course: number;
}

export interface Commentary {
  username: string;
  comment: string;
}
