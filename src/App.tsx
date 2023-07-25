import "./App.css";
import PostList from "./components/PostList";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <PostList />
      <ToDoList />
    </div>
  );
}

export default App;
