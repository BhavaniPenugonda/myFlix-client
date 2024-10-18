// Here  import the PropTypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


// The MovieCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={'/movies/${encodeURIComponent(movie.id)}'}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
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



