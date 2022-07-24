declare module "*.scss";

type Nullable<T> = T | null;

interface AppState {
  posts: PostsState;
}

interface PostsState {
  loading: boolean;
  error: null | string;
  items: PostsItem[];
  total: number;
  limit: number;
  page: number;
  sort: string;
  order: string;
  q: string;
}

interface PostsItem {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface SortBy {
  sort: string;
  order: string;
}
