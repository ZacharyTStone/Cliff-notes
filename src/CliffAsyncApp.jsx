import { useState, useEffect, useCallback } from "react";

const API_URL = `https://jsonplaceholder.typicode.com/todos`;

const CliffAsyncApp = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);

      if (res.ok) {
        const data = await res.json();
        setTodos(data);
        console.log(data);
      } else {
        throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
      }
    } catch (err) {
      setError(err.message);
      console.log("error in fetchTodos", error);
    } finally {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div>
      <h1>Cliff Async App</h1>
      <input
        type="input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search for todo"
      />
      {loading ? (
        <h1>Loading ...</h1>
      ) : error ? (
        <h1>Error: {error}</h1>
      ) : (
        todos
          ?.filter((todo) => {
            if (!debouncedSearchTerm) {
              return true;
            } else {
              return todo?.title
                ?.toLowerCase()
                ?.includes(debouncedSearchTerm?.toLowerCase());
            }
          })
          .map((todo) => (
            <div
              key={todo.id}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Todo {todo.id}</h1>
              <h5>{todo.title}</h5>
            </div>
          ))
      )}
    </div>
  );
};

export default CliffAsyncApp;
