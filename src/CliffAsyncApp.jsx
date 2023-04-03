import { useState, useEffect, useCallback } from "react";

const API_URL = `https://jsonplaceholder.typicode.com/todos`;

const CliffAsyncApp = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { search, setSearch } = useState("");

  const fetchTodos = useCallback(async () => {
    setLoading(true);
  }, [search]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div>
      <h1>Cliff Async App</h1>
    </div>
  );
};

export default CliffAsyncApp;
