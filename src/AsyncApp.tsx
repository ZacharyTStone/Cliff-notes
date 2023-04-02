import "./App.css";
import React, { useCallback, useEffect, useState } from "react";

// Define the shape of a Todo item
// we can't predict what the API will return, so we have to define the shape of the data we expect

type Todo = {
  id: number;
  title: string;
};

const API_URL: string = `https://jsonplaceholder.typicode.com/todos`;

export default function AsyncApp() {
  // API states
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  // Define the getTodos function to fetch the Todos from the API

  // Use async/await for cleaner, more readable code when dealing with Promises

  // useCallback is used to prevent the function from being recreated on every render, optimizing performance
  const getTodos = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(API_URL);

      // Check if the HTTP status code is in the 200s range (all good in the hood)
      if (response.ok) {
        // Await the response JSON data and store it in finalData
        const finalData: any[] = await response.json();
        console.log("final data", finalData);

        setTodos(finalData);
      } else {
        // If we had an issue with the api call, throw an error
        throw new Error(
          `HTTP error: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      // If any error occurs (this will also catch the above http error but is not limited to just that), update the error state and log it to the console
      setError(error.message);
      console.log("error in getTodos", error);
    } finally {
      // Set the loading state to false once the fetch is complete (regardless of success or failure)
      setIsLoading(false);
    }
  }, []);

  // Run the getTodos function when the component mounts, using useEffect
  // The empty dependency array ensures this effect only runs once (on mount)
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <main>
      React ⚛️ + Vite ⚡ + Replit 🌀
      <div>
        <h1>ToDos</h1>
        <input
          type="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a todo"
        />
        {isLoading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error: {error}</h1>
        ) : (
          // If not loading and no errors, display the fetched Todos
          todos?.map((todo) => (
            <div key={todo.id}>
              <h1>todo # {todo.id}</h1>
              <h5>{todo.title}</h5>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
