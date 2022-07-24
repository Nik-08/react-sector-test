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
