import React from "react";
import usePost from "../hooks/usePOst";


const PostList = () => {
  const pageSize = 10;
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } = usePost(
    { pageSize }
  );

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>...Loading</p>;

  return (
    <>
      <ul>
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>

      <button
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}
        className="btn btn-primary"
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </>
  );
};

export default PostList;
