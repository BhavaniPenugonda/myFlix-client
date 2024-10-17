import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Card } from "react-bootstrap";

import "./movie-view.scss";

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
