import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Search, Table } from "../components";

export const PostsPage: FC = () => {
  const [search] = useSearchParams({
    q: "",
    oder: "asc",
    sort: "id",
    page: "1",
  });

  const page = Number(search.get("page"));
  const q = search.get("q") || "";
  const order = search.get("order") || "asc";
  const sort = search.get("sort") || "id";

  return (
    <Container>
      <Search />
      <div className='main'>
        <Table page={page} q={q} order={order} sort={sort} />
      </div>
    </Container>
  );
};
