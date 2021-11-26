import { Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";

function App() {
  return (
    <div>
      {/* <nav>
        <Link path="/">/</Link>
        <Link path="/active">/active</Link>
        <Link path="/completed">/completed</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/active" element={<TodoList />} />
        <Route path="/completed" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
