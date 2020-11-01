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
  name: string;
  description: string;
  category: Category;
}
export interface Category {
  categoryName: string;
}
