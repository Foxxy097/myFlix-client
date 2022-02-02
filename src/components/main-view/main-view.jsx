import React from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
          movies: [
            {"Title":"Encanto",
            "Genre":{"Name":"Musical"},
            "Director":{"Name":"Byron Howar",
            "Birth":"1968-01-01"},
            "ImagePath":"https://www.imdb.com/title/tt2953050/mediaviewer/rm2541025281/"
        },
            {"Title":"Spider-Man: No Way Home",
            "Genre":{"Name":"Action"},
            "Director":{"Name":"Jon Watts"},
            "ImagePath":"https://www.imdb.com/title/tt10872600/mediaviewer/rm3936939521/"
        },
            {"Title":"Shang-chi and the legend of the ten rings",
            "Genre":{"name":"Action"},
            "Director":{"name":"Destin daniel cretton"},
            "ImagePath":"https://www.imdb.com/title/tt9376612/mediaviewer/rm4214145793/"
        },
            {"Title":"Eternal",
            "Genre":{"Name":"Action"},
            "Director":{"Name":"Kevin Feige"},
            "ImagePath":"https://www.imdb.com/title/tt9032400/mediaviewer/rm1427628801/"
        },
            {"Title":"Last Christmas",
            "Genre":{"Name":"Comedy"},
            "Director":{"Name":"Paul Feig"},
            "ImagePath":"https://www.imdb.com/title/tt8623904/mediaviewer/rm1963759361/"
        },
            {"Title":"Doctor Strange",
            "Genre":{"Name":"Action"},
            "Director":{"Name":"Scott Derrickson"},
            "ImagePath":"https://www.imdb.com/title/tt1211837/mediaviewer/rm3012758016/"
        },
            {"Title":"Doctor Strange 2",
            "Genre":{"Name":"Action"},
            "Director":{"Name":"Sam Raimi"},
            "ImagePath":"https://www.imdb.com/title/tt9419884/mediaviewer/rm1100344577/"
        },
            {"Title":"Zootopia",
            "Genre":{"Name":"Animated"},
            "Director":{"Name":"Byron Howard"},
            "Birthday":["1968-01-01"],
            "ImagePath":"https://www.imdb.com/title/tt2948356/mediaviewer/rm2690413824/"
        },
            {"Title":"The Witches",
            "Genre":{"Name":"Fantasy"},
            "Director":{"Name":"Robert Zemeckis"},
            "ImagePath":"https://www.imdb.com/title/tt0805647/mediaviewer/rm1215865857/"
        }
         ],
          selectedMovie: null
        };
    }
        setSelectedMovie(newSelectedMovie) {
            this.setState({
              selectedMovie: newSelectedMovie
            });
          }
          render() {
            const { movies, selectedMovie } = this.state;
        
            
            if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
        
            return (
              <div className="main-view">
                {selectedMovie
                  ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                  : movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
                  ))
                }
              </div>
            );
          }
        
        }