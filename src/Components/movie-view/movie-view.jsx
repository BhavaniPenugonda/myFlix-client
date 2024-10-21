import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./movie-view.scss";
/*
export const MovieView = ({ movie,  onBackClick}) => {
  return (
    <Card className="h-100">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <Card.Img variant="top" src={movie.ImagePath} />
        </Col>
        <Col md={8}>
          <Card.Body className=" justify-content-center h-100">
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>
              <strong>Description:</strong> {movie.Description}
            </Card.Text>
            <Card.Text>
              <strong>Genre:</strong> {movie.Genre.Name}
            </Card.Text>
            <Card.Text>
              <strong>Director:</strong> {movie.Director.Name}
            </Card.Text>
            <div>
              <Button variant="primary" onClick={onBackClick}>
                Back
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};
*/


export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);
  if (!movies || movies.length === 0) {
    return <div>Loading movies...</div>;
  }
  if (!movie) {
    return <div>Movie not found!</div>;
  }

  /*return (
    <div>
      <div>
        <img className="w-100" src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre}</span>
      </div>
      <Link to={'/'}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};  */


const director = movie.Director;
  const directorName = director?.Name || "Unknown Director";
  const directorBio = director?.Bio || "No Bio available";
  const directorBirth = director?.Birth || "No Birth date available";
  const directorDeath = director?.Death || "N/A";

  // Handle Genre object (if it exists)
  const genre = movie.Genre;
  const genreName = genre?.Name || "Unknown Genre";
  const genreDescription = genre?.Description || "No description available";

  return (
    <div>
      {/* Movie Image */}
      <div>
        <img className="w-100" src={movie.ImagePath} alt={movie.Title} />
      </div>

      {/* Movie Title */}
      <h2>{movie.Title}</h2>

      {/* Director Details */}
      <h3>Director</h3>
      <p>
        <strong>Name:</strong> {directorName}
      </p>
      <p>
        <strong>Bio:</strong> {directorBio}
      </p>
      <p>
        <strong>Birth:</strong> {directorBirth}
      </p>
      {director.Death && (
        <p>
          <strong>Death:</strong> {directorDeath}
        </p>
      )}

      {/* Genre Details */}
      <h3>Genre</h3>
      <p>
        <strong>Name:</strong> {genreName}
      </p>
      <p>
        <strong>Description:</strong> {genreDescription}
      </p>

      {/* Back Button */}
      <Link to="/">
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
