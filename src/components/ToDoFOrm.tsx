import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import { Todo } from "../hooks/useTodos";

interface addTodoContex {
  previousTodos: Todo[];
}
const ToDoFOrm = () => {
  const queryClient = useQueryClient();

  const addTodo = useMutation<Todo, Error, Todo, addTodoContex>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),

    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo,
        ...(todos || []),
      ]);
      if (ref.current) ref.current.value = "";

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
      //   console.log(newTodo, savedTodo);
      //APProach: Invalidating the cache
      // queryClient.invalidateQueries({
      //     queryKey: 'todos'
      // }),

      //Approach: Updating the data in the cache
    },

    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>([todos], context.previousTodos);
    },
  });

  const ref = useRef<HTMLInputElement>(null);
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
