import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { Todo } from "../hooks/useTodos";
const ToDoFOrm = () => {
  const queryClient = useQueryClient();

  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onSuccess: (savedTodo, newTodo) => {
      console.log(newTodo, savedTodo);
      //APProach: Invalidating the cache
      // queryClient.invalidateQueries({
      //     queryKey: 'todos'
      // }),

      //Approach: Updating the data in the cache

      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        ...(todos || []),
      ]);
      if (ref.current) ref.current.value = "";
    },
  });

  const ref = useRef<HTMLInputElement>();
  return (
    <>
      {addTodo.error && (
        <div className="alert lert-danger"> {addTodo.error?.message}</div>
      )}

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

        <button className="btn btn-primary" disabled={addTodo.isLoading}>
          {" "}
          {addTodo.isLoading ? "Adding..." : "Add"}
        </button>
      </form>
    </>
  );
};

export default ToDoFOrm;
