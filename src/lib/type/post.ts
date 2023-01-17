export type AllPostsCategoryType =
  | "popular"
  | "recent"
  | "place"
  | "store"
  | "lodging";

export interface AllPostsType {
  popularList: {
    content: GetPostType[];
  };
  recentList: {
    content: GetPostType[];
  };
  placeList: {
    content: GetPostType[];
  };
  storeList: {
    content: GetPostType[];
  };
  lodgingList: {
    content: GetPostType[];
  };
}

export interface GetPostType {
  viewCount: number;
  id: number;
  category: string;
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
  createdate: string;
  liked: number;
  username?: string;
  useremail?: string;
  profileImage?: string;
}

export interface AddPostType {
  category: string;
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

export interface DetailPostType {
  viewCount: number;
  id: number;
  category: string;
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
  liked: {
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
