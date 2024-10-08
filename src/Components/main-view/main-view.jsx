import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import {MovieView } from "../movie-view/movie-view";
import { movies} from "../movie-data/movie-data";




  export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
    <MovieView movie= {selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
          
        />
      ))}
    </div>
  );
  };