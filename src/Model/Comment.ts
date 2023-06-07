export interface Comment {
  _id: string;
  description: string;
  profile: {
    _id: string;
    name: string;
    user: string;
    following: string[];
    followers: string[];
    createdAt: string;
    updateAt: string;
    __v: number;
  };
  post: string;
  likes: string[];
  createdAt: string;
  updateAt: string;
  __v: number;
}
