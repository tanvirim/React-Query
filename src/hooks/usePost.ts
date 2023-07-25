import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  userId: number;
  body: string;
}

interface PostQuery {
  page: number;
  pageSize: number;
}
const usePost = (query: PostQuery) =>
  useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (query.page - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000, //1 min
    keepPreviousData: true,
  });

export default usePost;
