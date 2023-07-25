import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ToDoList = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {" "}
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default ToDoList;
