import { useQuery } from "@tanstack/react-query";
import todoService from "../react-query/services/todoService";
import CACHE_KEY_TODOS from "../react-query/constants";
import { Todo } from "../react-query/services/todoService";


const useTodos = () => {

  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoService.getAll,
    staleTime: 10 * 1000,
  });
};

export default useTodos;
