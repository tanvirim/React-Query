import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { Todo } from "../hooks/useTodos";
const ToDoFOrm = () => {
  const queryClient = useQueryClient();

  const addTodo = useMutation({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onSuccess: (savedTodo, newTodo) => {
      //APProach: Invalidating the cache
      // queryClient.invalidateQueries({
      //     queryKey: 'todos'
      // }),

      //Approach: Updating the data in the cache

      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        ...(todos || []),
      ]);
    },
  });

  const ref = useRef<HTMLInputElement>();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // if (ref.current && ref.current.value)
        addTodo.mutate({
          title: ref.current?.value,
          id: 0,
          completed: false,
          userId: 1,
        });
      }}
    >
      <input ref={ref} type="text" className="form-control" />

      <button className="btn btn-primary"> add todo</button>
    </form>
  );
};

export default ToDoFOrm;
