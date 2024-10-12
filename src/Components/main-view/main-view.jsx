import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import {MovieView } from "../movie-view/movie-view";
/*import { movies} from "../movie-data/movie-data"; */
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);


  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://flixmovies-1ddcfb2fa4c5.herokuapp.com/movies",
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
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

  }, [token]);
  
  if (!user) {
    return (
    <LoginView onLoggedIn={(user,token) => {
      setUser(user);
      setToken(token);
    
    }}
    />
  );
  }

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
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
}
