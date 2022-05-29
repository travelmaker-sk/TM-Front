export interface UserType {
  username: string;
  email: string;
  profileImage?: string;
  postCount?: number;
  followers?: number;
  followings?: number;
}

export interface CardType {
  id: number;
  title: string;
  location: string;
  memo?: string;
  tag?: Array<string>;
  filename?: string;
  filepath?: string;
  score: number;
  date: string;
  liked: number;
  uploadDate: string;
  writer: {
    username: string;
    profileImage?: string;
  };
  category: "place" | "restaurant" | "accommodation";
  weather?: string;
  menu?: string;
  price?: number;
}

export interface AllPostsType {
  popular: CardType[];
  recent: CardType[];
  place: CardType[];
  restaurant: CardType[];
  accommodation: CardType[];
}
