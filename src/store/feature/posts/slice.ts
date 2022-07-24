import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

export const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  limit: 10,
  page: 1,
  sort: "id",
  order: "asc",
  q: "",
};

export const getAll = createAsyncThunk<
  PostsItem[],
  void,
  {
    rejectValue: string;
    state: RootState;
  }
>("posts/getAll", async (_, { rejectWithValue, getState }): Promise<any> => {
  try {
    let { page, limit, sort, order, q } = getState().posts;

    q = q !== "" ? q : "";

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}&q=${q}`
    );

    if (!response) throw new Error("Server Error!");

    return response;
  } catch (e: any) {
    return rejectWithValue(String(e.message));
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setNextPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSort: (state, action: PayloadAction<SortBy>) => {
      state.sort = action.payload.sort;
      state.order = action.payload.order;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.q = action.payload;
      state.page = 1;
    },
  },
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

export const { setNextPage, setSort, setSearch } = postsSlice.actions;

export default postsSlice.reducer;
