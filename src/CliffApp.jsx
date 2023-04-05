import { useEffect, useState, useCallback } from "react";

//Define the API endpoint
const API_URL = `https://jsonplaceholder.typicode.com/todos`;

const CliffApp = () => {
  const [info, setInfo] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fetchedApi = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(API_URL);

      if (res.ok) {
        const data = await res.json();
        setInfo(data);
      } else {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    fetchedApi();
  }, [fetchedApi]);

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {isLoading ? (
        <h1>Loading ...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        info
          ?.filter((eachInfo) => {
            if (!debouncedSearch) {
              return true;
            } else {
              return eachInfo?.title
                ?.toLowerCase()
                .includes(debouncedSearch?.toLowerCase());
            }
          })
          .map((finalInfo) => (
            <div key={finalInfo.id}>
              <h1>{finalInfo.title}</h1>
            </div>
          ))
      )}
    </div>
  );
};

export default CliffApp;
