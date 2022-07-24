import { GetAllPayload } from "../slice";

export const post1: PostsItem = {
  userId: 1,
  id: 1,
  title: "Lorem ipsum dolor sit amet consectetur",
  body: "Lorem ipsum dolor sit amet consectetur",
};

export const argMock: GetAllPayload = {
  page: 1,
  sort: "id",
  order: "asc",
  q: "",
};
