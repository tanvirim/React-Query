import { useRef } from "react";
import useAddTodo from "../hooks/useAddTodo";

const ToDoFOrm = () => {
  const ref = useRef<HTMLInputElement>(null);

  const addTodo = useAddTodo(() => {
    if (ref.current) ref.current.value = "";
  });
  return (
    <>
      {addTodo.error && (
        <div className="alert lert-danger"> {addTodo.error?.message}</div>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();

          if(ref.current && ref.current.value)
          addTodo.mutate({
            title: ref.current?.value,
            id: 0,
            completed: false,
            userId: 1,
          });
        }}
      >
        <input ref={ref} type="text" className="form-control" />

        <button className="btn btn-primary">
          Add
        </button>
      </form>
    </>
  );
};

export default ToDoFOrm;
