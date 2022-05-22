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
  writer: {
    username: string;
    profileImage?: string;
  };
}

export interface PlaceCardType extends CardType {
  category: "place";
  weather: string;
}

export interface RestCardType extends CardType {
  category: "restaurant";
  menu: string;
  price: number;
}

export interface AccomCardType extends CardType {
  category: "accommodation";
  price: number;
}
