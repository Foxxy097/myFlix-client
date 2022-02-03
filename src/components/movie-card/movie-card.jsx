import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    const {movie, onMovieClick} = this.props;

    return ( 
      <div className="movie-card" onClick={(movie) => { onMovieClick(movie); }}>{movie.Title}</div>
    );
  }
}

MovieCard.propTypes ={
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick:PropTypes.func.isRequired
};