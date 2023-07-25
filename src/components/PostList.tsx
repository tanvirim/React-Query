import { useState } from "react";
import usePost from "../hooks/usePost";

const PostList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, error, isLoading } = usePost({ page, pageSize });

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>...Loading</p>;

  return (
    <>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="btn btn-primary"
      >
        {" "}
        previous{" "}
      </button>

      <button onClick={() => setPage(page + 1)} className="btn btn-primary">
        {" "}
        next{" "}
      </button>
    </>
  );
};

export default PostList;
