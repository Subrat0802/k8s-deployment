import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // GET TODOS
  const getTodos = async () => {
    try {
      const response = await fetch("/api/v1/todo");

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();

      setTodos(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // CREATE TODO
  const createTodo = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      return;
    }

    try {
      const response = await fetch("/api/v1/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const data = await response.json();

      // Add new todo to the existing list
      setTodos((prev) => [data.data, ...prev]);

      // Clear inputs
      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="bg-black min-h-screen w-full text-white p-10">

      <h1 className="font-bold text-4xl mb-10">
        Subrat Mishra
      </h1>

      {/* CREATE TODO */}
      <form
        onSubmit={createTodo}
        className="max-w-md mx-auto mb-10 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 text-black rounded"
        />

        <textarea
          placeholder="Todo description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 text-black rounded"
        />

        <button
          type="submit"
          className="bg-white text-black p-3 rounded font-bold"
        >
          Create Todo
        </button>
      </form>

      {/* TODOS */}
      <div className="max-w-md mx-auto flex flex-col gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="border border-gray-700 p-4 rounded"
          >
            <h3 className="text-xl font-bold">
              {todo.title}
            </h3>

            <p className="text-gray-400 mt-2">
              {todo.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;