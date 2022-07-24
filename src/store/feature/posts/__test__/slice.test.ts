import reducer, { initialState, getAll } from "../slice";
import { post1, argMock } from "../__mock__/posts";

const arg = argMock;

test("Should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialState);
});

test("Should set loading while getAll pending", () => {
  const requestId = "9c611832-329f-49d0-88ec-b7bb2e62d6d3";
  const action = getAll.pending(requestId, arg);
  const nextState = reducer(initialState, action);

  expect(nextState.loading).toBe(true);
  expect(nextState.items.length).toBe(0);
  expect(nextState.error).toBe(null);
});

test("Should set getAll result", () => {
  const items: PostsItem = post1;

  const payload: any = {
    data: {
      ...items,
    },
    headers: {
      "x-total-count": 10,
    },
  };

  const action: any = getAll.fulfilled(payload, "", arg);

  const nextState = reducer(initialState, action);

  expect(nextState.loading).toBe(false);
  expect(nextState.items).toEqual(items);
  expect(nextState.error).toEqual(null);
});

test("Should save error to state", () => {
  const error = new Error("Test error");

  const action = getAll.rejected(error, "test", arg);

  const nextState = reducer(initialState, action);

  expect(nextState.loading).toBe(false);
  expect(nextState.items).toStrictEqual([]);
  expect(nextState.error).toBeDefined();
});
