import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import {MovieView } from "../movie-view/movie-view";
/*import { movies} from "../movie-data/movie-data"; */
import { LoginView } from "../login-view/login-view";


export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://flixmovies-1ddcfb2fa4c5.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre,
            Director: movie.Director,
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);
  
  if (!user) {
    return <LoginView onLoggedIn={(user) => setUser(user)}/>;
  }

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <>
      <button
        onClick={() => {
          setUser(null);
        }}
      >
        Logout
      </button>
    <MovieView movie= {selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
      </>
    );
  }

  if (movies.length === 0) {
    return(
      <>
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          Logout
        </button>
     <div>The list is empty!</div>;
     </>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          setUser(null);
        }}
      >
        Logout
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
          
        />
      ))}
    </div>
  );
  };
