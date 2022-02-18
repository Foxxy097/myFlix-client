import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Container, Card, Button, Row} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './director-view.scss';

export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick } = this.props;

        return (
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title>Director</Card.Title>
                        <Card.Text>
                            <span className="label">Name: </span>
                            <span className="value">{director.Name}</span>
                        </Card.Text>
                        <Card.Text>
                            <span className="label">Bio: </span>
                            <span className="value">{director.Bio}</span>
                        </Card.Text>
                        <Card.Text>
                            <span className="label">Birth: </span>
                            <span className="value">{director.Birth}</span>
                        </Card.Text>
                        <Card.Text>
                            <span className="label">Death: </span>
                            <span className="value">{director.Death}</span>
                        </Card.Text>

                        <Button variant="outline-dark" onClick={() => { onBackClick(); }}>Back</Button>
                    </Card.Body>
                </Card>
                <Row>
                    {movies.map(movie => (
                        <Card className="favorite-movie card-content" key={movie._id} >
                            <Card.Img
                                className="fav-poster"
                                variant="top"
                                src={movie.ImagePath} />
                            <Card.Body style={{ backgroundColor: "black" }}>
                                <Card.Title className="movie_title">
                                    {movie.Title}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
        );
    }
}
DirectorView.proptypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
    }).isRequired,
};