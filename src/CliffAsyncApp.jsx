import { useState, useEffect, useCallback, useMemo } from "react";

//Define the API endpoint
const API_URL = `https://jsonplaceholder.typicode.com/todos`;

const CliffAsyncApp = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  //need to implement useCallback so function isn't being recreated on every re-render, improving performance
  const fetchTodos = useCallback(async () => {
    //start the loading process
    setLoading(true);
    try {
      //await fetch
      const res = await fetch(API_URL);
      //if the response is 200 or a version of that then we continue change data to json and set it to setTodos state
      if (res.ok) {
        const data = await res.json();
        setTodos(data);
        console.log(data);
      } else {
        //if there is an issue with fetching the api then this will tell us
        throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
      }
    } catch (err) {
      //set the error message, this error catch block will catch the api error as well as all other errors
      setError(err.message);
      console.log("error in fetchTodos", error);
    } finally {
      setLoading(false);
    }
  }, [error]);

  //use the useMemo hook to memoize the filtered list, so that it only re-renders when the todos or debouncedSearchTerm dependencies change.
  const filteredTodos = useMemo(() => {
    return todos?.filter((todo) => {
      if (!debouncedSearchTerm) {
        return true;
      }
    });
  }, [debouncedSearchTerm, todos]);

  //Add a debounce function to delay search function for 500ms so that it doesn't execute on every keypress
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  //Fetch data from API when the component mounts and whenever fetchTodos updates
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
        filteredTodos.map((todo) => (
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
