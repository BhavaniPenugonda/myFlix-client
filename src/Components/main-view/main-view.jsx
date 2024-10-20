import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import {MovieView } from "../movie-view/movie-view";
/*import { movies} from "../movie-data/movie-data"; */
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";



export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  


  useEffect(() => {
    if (!token) return;
    fetch("https://flixmovies-1ddcfb2fa4c5.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }, // Include the token in the request
    })
      
      .then((response) => response.json())
      .then((data) => {
        
        setMovies(data);
        });
  }, [token]);
  
  const toggleFavorite = async (movieId) => {
    if (!user) return;

    const isFavorite = user.FavoriteMovies.includes(movieId);
    const method = isFavorite ? "DELETE" : "POST"; // DELETE to remove, POST to add

    try {
      const response = await fetch(
        `https://flixmovies-1ddcfb2fa4c5.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        {
          method: method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite movies.");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err.message);
    }
  };

 

return (
  <BrowserRouter>
  <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => {
                      const isFavorite = user?.FavoriteMovies?.includes(
                        movie._id
                      ); // Check if the movie is a favorite
                      return(
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movie={movie}
                       onMovieClick={() => setSelectedMovie(movie)}
                       onFavoriteToggle={() => toggleFavorite(movie._id)}
                       isFavorite={isFavorite}  />
                      </Col>
                      );
                    })}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile/:username"
            element={
              user ? (
                <ProfileView token={token} setUser={setUser} movies={movies} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
