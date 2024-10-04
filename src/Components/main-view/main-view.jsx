import { useState } from "react";

export const MainView = () => {

  const [movies, setMovies] = useState([
    { id: 1, title: "Inception" },
    { id: 2, title: "The Matrix" },
    { id: 3, title: "Interstellar" },
    { id: 4, title: "The Dark Knight" },
    { id: 5, title: "Pulp Fiction" }
  ]);

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return <div key={movie.id}>{movie.title}</div>;
      })}
    </div>
  );
};