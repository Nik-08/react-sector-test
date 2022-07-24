import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

export const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  limit: 10,
};

export interface GetAllPayload {
  page: number;
  sort: string;
  order: string;
  q: string;
}

export const getAll = createAsyncThunk<
  PostsItem[],
  GetAllPayload,
  {
    rejectValue: string;
    state: RootState;
  }
>(
  "posts/getAll",
  async (payload, { rejectWithValue, getState }): Promise<any> => {
    try {
      const { page, sort, order, q } = payload;
      let { limit } = getState().posts;

      const response = await axios.get<PostsItem[]>(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}&q=${q}`
      );

      if (!response) throw new Error("Server Error!");

      return response;
    } catch (e: any) {
      return rejectWithValue(String(e.message));
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAll.fulfilled, (state, action: any) => {
        state.loading = false;
        state.items = action.payload.data;
        state.total = Number(action.payload.headers["x-total-count"]);
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.items = [];
        state.error = String(action.payload);
      });
  },
});

export default postsSlice.reducer;
