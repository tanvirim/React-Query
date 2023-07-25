import usePost from "../hooks/usePost";

const PostList = () => {
  const { data, error, isLoading } = usePost();

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>...Loading</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default PostList;
