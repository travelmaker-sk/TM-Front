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
  store: GetPostType[];
  lodging: GetPostType[];
}

export type AllPostsCategoryType =
  | "popular"
  | "recent"
  | "place"
  | "store"
  | "lodging";

export type CategoryType = "place" | "store" | "lodging" | string;

export interface GetPostType {
  viewCount: number;
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
  image?: string;
  like: {
    likeNum: number;
    likeCheck: boolean;
  };
  bookmarkCheck: boolean;
  writer: {
    username: string;
    profileImage?: string;
  };
  createDate: string;
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
