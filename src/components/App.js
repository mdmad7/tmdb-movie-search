import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './Dashboard/SearchBar';
import MovieInfo from './Dashboard/MovieInfo';
import Radium from 'radium';
import logo from '../powered-by-rectangle-green.svg';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {fetchedItem: null};
    this.setSelectedItem = this.setSelectedItem.bind(this);
  }

  setSelectedItem(id) {
    if(id !== undefined) {
      console.log(id)
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=2a99618877f82a3aaaad30d1b669401a&append_to_response=releases,credits`)
      .then((response) => {
        console.log(response.data);
        this.setState({fetchedItem: response.data}, () => {
          console.log(this.state.fetchedItem)
        });
      })
      .catch((error) => {
        console.log(error);
      })
    } else {
      axios.get('https://api.themoviedb.org/3/movie/297761?api_key=2a99618877f82a3aaaad30d1b669401a&append_to_response=releases,credits')
      .then((response) => {
        // console.log(response.data);
        this.setState({fetchedItem: response.data}, () => {
          console.log(this.state.fetchedItem)
        });
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  componentDidMount() {
    this.setSelectedItem();
  }

  render() {
    const {fetchedItem} = this.state;
    let imgUrl = "";
    fetchedItem ? imgUrl = "http://image.tmdb.org/t/p/w500//"+fetchedItem.backdrop_path : console.log('no image')
    const style = {
      base: {
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        filter: 'blur(30px)',
        position: 'absolute',
        transform: 'scale(1.1)',
        width: '100vw',
        height: '100vh'
      },
      bg: {
        backgroundColor: "#081c24"
      },
      color: {
        color: '#fff'
      }
    };
    return (
      <div className="movie-info">
        <div className="" style={style.base}></div>
        <nav className="navbar navbar-light" style={style.bg}>
          <div className="container">
            <a className="navbar-brand" href="/">
              <img src={logo} alt={`tmdb logo`} width="120" /> 
              <span style={style.color}>MOVIE SEARCH</span>
            </a>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-7 offset-md-5 no-padding">
              <SearchBar setSelectedItem={this.setSelectedItem}/>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {
                this.state.fetchedItem !== null ?
                <MovieInfo fetchedItem={this.state.fetchedItem} /> :
                null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(App);
