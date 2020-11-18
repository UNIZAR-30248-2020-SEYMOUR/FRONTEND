export interface SelfProfile {
  uuid: string;
  username: string;
  email: string;
  description: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Course {
  coursename: string;
  description: string;
  category: Category;
}
export interface Category {
  name: string;
  imageUrl: string;
}
export interface UsersProfile {
  username: string;
  description: string;
}
