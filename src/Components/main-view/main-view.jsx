import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {

  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      description:
        "A skilled thief, the absolute best in the dangerous art of extraction, steals valuable secrets from deep within the subconscious during the dream state.",
      poster: "https://example.com/inception.jpg", // Replace with actual image URL
      genre: "Sci-Fi, Thriller",
      director: "Christopher Nolan"
    },
    {
      id: 2,
      title: "The Matrix",
      description:
        "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      poster: "https://example.com/matrix.jpg", // Replace with actual image URL
      genre: "Sci-Fi, Action",
      director: "The Wachowskis"
    },
    {
      id: 3,
      title: "Interstellar",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      poster: "https://example.com/interstellar.jpg", // Replace with actual image URL
      genre: "Sci-Fi, Adventure",
      director: "Christopher Nolan"
    },
    {
      id: 4,
      title: "The Dark Knight",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      poster: "https://example.com/darkknight.jpg", // Replace with actual image URL
      genre: "Action, Crime, Drama",
      director: "Christopher Nolan"
    },
    {
      id: 5,
      title: "Pulp Fiction",
      description:
        "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      poster: "https://example.com/pulpfiction.jpg", // Replace with actual image URL
      genre: "Crime, Drama",
      director: "Quentin Tarantino"
    }
  ]);

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};