import "./App.css";
import React, { useCallback, useEffect, useState } from "react";

// Define the shape of a Todo item
type Todo = {
  id: number;
  title: string;
};

// Define the URL for fetching Todos
const API_URL: string = `https://jsonplaceholder.typicode.com/todos`;

export default function AsyncApp() {
  // Define the state variables for storing the fetched Todos, loading status, and error messages
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Define the getTodos function to fetch the Todos from the API
  // useCallback is used to prevent the function from being recreated on every render, optimizing performance
  // Use async/await for cleaner, more readable code when dealing with Promises
  const getTodos = useCallback(async () => {
    setIsLoading(true);

    try {
      // Use the fetch API to make the request
      const response = await fetch(API_URL);
      console.log("response", response);

      // Check if the HTTP status code is 200 (OK) before processing the response
      if (response.status === 200) {
        // Await the response JSON data and store it in finalData
        const finalData: Todo[] = await response.json();
        console.log("final data", finalData);

        // Update the state with the fetched Todos
        setTodos(finalData);
      } else {
        // If the status code is not 200, throw an error with the status code and status text
        throw new Error(
          `HTTP error: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      // If an error occurs, update the error state and log it to the console
      setError(error.message);
      console.log("error:", error);
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
