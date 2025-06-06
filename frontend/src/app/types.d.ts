export {};

declare global {
  type User = {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };

  type Note = {
    _id: string;
    user: string;
    title: string;
    url?: string;
    content?: string;
    tags: string[];
    favourite: boolean;
    createdAt: string;
    updatedAt: string;
  };

  type User = {
    _id: string;
    name: string;
    email: string;
  };
}
