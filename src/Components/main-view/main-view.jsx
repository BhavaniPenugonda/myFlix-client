import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import {MovieView } from "../movie-view/movie-view";

import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { MoviesList } from "../movies-list/movies-list";
import { setUser } from "../../redux/reducers/user/user"; // Import the setUser action
import { backend_api } from "../../constants"; // import backend api url from constants

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  /*const [movies, setMovies] = useState([]);*/
  /*const [user, setUser] = useState(null);*/
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, [dispatch]);


  useEffect(() => {
    if (!token){
      console.error("No token found.");
  return;
    } 
    fetch(`${backend_api}/movies`, {
      headers: { Authorization: `Bearer ${token}` }, // Include the token in the request
    })
      
      .then((response) => response.json())
      .then((data) => {
        
        dispatch(setMovies(data));
        });
  }, [token]);
  
  const toggleFavorite = async (movieId) => {
    console.log("Toggling favorite for movie ID:", movieId);
    if (!user || !Array.isArray(user.FavoriteMovies)) 
      return;
    const isFavorite = user.FavoriteMovies.includes(movieId);
    console.log(isFavorite)
    const method = isFavorite ? "DELETE" : "POST"; // DELETE to remove, POST to add

    try {
      const response = await fetch(
        `${backend_api}/users/${user.Username}/movies/${movieId}`,
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
      alert(isFavorite ? 'Movie removed from favorites successfully' : 'Movie added to favorites successfully')

      const updatedUser = await response.json();
      dispatch(setUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error(err.message);
    }
  };

 

return (
  <BrowserRouter>
  <NavigationBar
        
        
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
                    <LoginView  />
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
                    <MovieView />
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
                      )  || false; // Check if the movie is a favorite
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
                <ProfileView 
                user={user}
                token={token}
                setUser={(updatedUser) => dispatch(setUser(updatedUser))}
                movies={movies} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              <>{!user ? <Navigate to="/login" replace /> : <MoviesList />}</>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
