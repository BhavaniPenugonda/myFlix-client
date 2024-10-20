import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card"; 

export const ProfileView = ({ token, setUser, movies }) => {
  const [user, setUserState] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Ensure user is retrieved
    if (!storedUser) {
      setError("No user data found.");
      setLoading(false);
      return;
    }
    fetch(
      `https://flixmovies-1ddcfb2fa4c5.herokuapp.com/users/${storedUser.Username}`,
      {
        headers: { Authorization: `Bearer ${token}` }, 
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUserState(data); // Set user data
        setUsername(data.Username);
        setEmail(data.Email);
        setBirthday(data.Birthday ? data.Birthday.slice(0, 10) : ""); // Set date in 'YYYY-MM-DD' format
        setLoading(false); 
      })
      .catch((err) => {
        setError(err.message); // Capture any errors
        setLoading(false);
      });
  }, [token]);

  const handleUpdate = (e) => {
    e.preventDefault();
    // API request to update user profile
    fetch(
      'https://flixmovies-1ddcfb2fa4c5.herokuapp.com/users/${user.Username}',
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update profile");
        }
        return response.json();
      })
      .then((updatedUser) => {
        setUser(updatedUser); // Update the user data in the parent state (if using)
        setUserState(updatedUser); // Update the local user data
        alert("Profile updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong while updating the profile.");
      });
  };

  // Filter the user's favorite movies based on the movie IDs in user.FavoriteMovies
  const favoriteMovies = movies.filter((m) =>
    user?.FavoriteMovies?.includes(m._id)
  );

  if (loading) return <p>Loading user information...</p>; // Show loading state
  if (error) return <p>Error: {error}</p>; // Show error state

  if (!user) return null; // If user data isn't available, return null

  return (
    <Row>
      <Col md={6}>
        <h3>Your Profile Information</h3>
        <p>
          <strong>Username:</strong> {user.Username}
        </p>
        <p>
          <strong>Email:</strong> {user.Email}
        </p>
        <p>
          <strong>Birthday:</strong> {new Date(user.Birthday).toDateString()}
        </p>
      </Col>

      <Col md={6}>
        <h3>Update Profile</h3>
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="5"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBirthdate">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Update Profile
          </Button>
        </Form>
      </Col>

      <Col md={12} className="mt-4">
        <h3>Your Favorite Movies</h3>
        {favoriteMovies.length === 0 ? (
          <p>You don't have any favorite movies yet.</p>
        ) : (
          <Row>
            {favoriteMovies.map((movie) => (
              <Col key={movie._id} md={4}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  );
};
