export interface User {
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
  courseName: string;
  courseDescription: string;
}
