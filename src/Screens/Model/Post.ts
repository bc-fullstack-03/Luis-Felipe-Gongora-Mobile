export interface Post {
  _id: string;
  title: string;
  description: string;
  profile: {
    _id: string;
    name: string;
    user: string;
  };
  comments: [];
  likes: string[];
  image: boolean;
}
