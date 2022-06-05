export interface UserType {
  username: string;
  email: string;
  profileImage?: string;
  postCount?: number;
  followers?: number;
  followings?: number;
}

export interface AllPostsType {
  popular: GetPostType[];
  recent: GetPostType[];
  place: GetPostType[];
  restaurant: GetPostType[];
  accommodation: GetPostType[];
}

export type AllPostsCategoryType =
  | "popular"
  | "recent"
  | "place"
  | "restaurant"
  | "accommodation";

export type CategoryType = "place" | "restaurant" | "accomodation" | string;

export interface GetPostType {
  id: number;
  category: CategoryType;
  title: string;
  location: string;
  date: string;
  score: number;
  weather?: string;
  menu?: string;
  price?: number;
  memo?: string;
  tagList?: Array<string>;
  imageUrl?: string;
  like: {
    likeNum: number;
    likeCheck: boolean;
  };
  bookmarkCheck: boolean;
  uploadDate: string;
  view: number;
  writer: {
    username: string;
    profileImage?: string;
  };
}

export interface PostType {
  post: GetPostType | null;
}

export interface AddPostType {
  category: CategoryType;
  title: string;
  location: string;
  date: string;
  score: number;
  weather?: string;
  menu?: string;
  price?: number;
  memo?: string;
  tagList?: Array<string>;
  image?: File;
}

export interface EditPostType extends AddPostType {
  id: number;
}
