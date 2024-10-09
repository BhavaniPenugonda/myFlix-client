// Here  import the PropTypes library
import PropTypes from "prop-types";

// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description:PropTypes.string,
    Genre:PropTypes.string,
    Director:PropTypes.string

  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};



