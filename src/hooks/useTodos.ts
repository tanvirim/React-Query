import { useQuery } from "@tanstack/react-query";

import CACHE_KEY_TODOS from "../react-query/constants";
import APIClient from "../react-query/services/apiClient";

const apiCLient = new APIClient<Todo>('/todos', )
export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodos = () => {

  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: apiCLient.getAll,
    staleTime: 10 * 1000,
  });
};

export default useTodos;
