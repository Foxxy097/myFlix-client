import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router,Route, Redirect } from "react-router-dom"

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../ProducerView/producer-view';
import { ProfileView } from '../ProfielView/profile-view';
import {UserUpdate } from '../ProfileView/user-update';
import { Menu } from '../navbar-view/navbar-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
          movies: [],
          selectedMovie: null,
          user: null
        };
      }

        getMovies(token) {
          axios.get('https://myflixapp1.herokuapp.com/movies', {
            headers: {Authorization:`Bearer ${token}`}
          })
          .then(response => {
            // Assign the result to the state
            this.setState({
              movies: response.data
            });
          })
          .catch(function (error) {
          console.log(error);
          });
        }

        componentDidMount() {
          let accessToken = localStorage.getItem('token');
          if (accessToken !== null) {
            this.setState({
              user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
          }
        }

        onLoggedIn(authData) {
          console.log(authData);
          this.setState({
            user: authData.user.Username
          });

          localStorage.setItem('token', authData.token);
          localStorage.setItem('user', authData.user.Username);
          this.getMovies(authData.token);
        }
        
        render() {
            const { movies, user} = this.state;

            return (
              <Router>
                <Menu user={user} />
                <Container>
                  <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                    if (!user) return <Col>
                    <LoginView movies ={movies} onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                    if (movies.length === 0) return <div className="main-view" />;
                    return movies.map (m => (
                    <Col md={3} key={m._id}>
                      <MovieCard movie={m} />
                    </Col>
                    ))
                    }} />
                    <Route path="/register" render={() => {
                      if (user) return <Redirect to ="/" />
                      return <Col lg={8} md={8}>
                        <RegistrationView />
                      </Col>
                    }} />
                    <Route path="/movies/:id" render ={({ match, history }) => { 
                      return <Col md={8}>
                        <MovieView movie={movies.find(m => m._id === match.params.id)} onBackClick={() => history.goBack()} />
                      </Col>
                    }} />
                    <Route path="/movie-director/:id" render={({ match, history}) => {
                      return <Col>
                        <DirectorView movie={movies.find(m => m._id === match.params.id)} onBackCick={() => history.goBack()} />
                      </Col>
                    }} />
                    <Route path={`/users/${user}`} render={({ match, histroy}) => {
                      if (!user) return <Redirect to="/" />
                      return <Col>
                        <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                      </Col>
                    }} />
                    <Route path={`/user-update/{user}`} render={({ match, history}) => {
                      if(!user) return <Redirect to="/" />
                      return <Col>
                        <UserUpdate user={user} onBackClick={() => history.goBack()} />
                      </Col>
                    }} />
                  </Row>
                </Container>
              </Router>
            );

          }
        }
      export default MainView;