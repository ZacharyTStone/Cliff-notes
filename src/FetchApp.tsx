import "./App.css";
import React, { useCallback, useEffect, useState } from "react";

// Define the shape of a Todo item
type Todo = {
  id: number;
  title: string;
};

// Define the URL for fetching Todos
const API_URL: string = `https://jsonplaceholder.typicode.com/todos`;

// A helper function to handle the response from the API
// It checks if the response is valid (HTTP status code 200)
// If it's valid, it returns the parsed JSON data, otherwise, it throws an error
const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export default function FetchApp() {
  // Define the state variables for storing the fetched Todos, loading status, and error messages
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Define the getTodos function to fetch the Todos from the API
  // useCallback is used to prevent the function from being recreated on every render, optimizing performance
  const getTodos = useCallback(() => {
    // Set the loading state to true when starting the fetch
    setIsLoading(true);

    // Use the fetch API to make the request
    fetch(API_URL)
      .then(handleResponse) // Handle the response (check for errors and parse JSON)
      .then((finalData: Todo[]) => {
        // Update the state with the fetched Todos
        setTodos(finalData);
      })
      .catch((error) => {
        // If an error occurs, update the error state and log it to the console
        setError(error.message);
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        // Set the loading state to false once the fetch is complete (regardless of success or failure)
        setIsLoading(false);
      });
  }, []);

  // Run the getTodos function when the component mounts, using useEffect
  // The empty dependency array ensures this effect only runs once (on mount)
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  // Render the component UI
  return (
    <main>
      React ⚛️ + Vite ⚡ + Replit 🌀
      <div>
        <h1>ToDos</h1>
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
