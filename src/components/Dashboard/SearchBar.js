import React, { Component } from 'react';
import axios from 'axios';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: []
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.renderMenuItemChildren = this.renderMenuItemChildren.bind(this);
    this.clickedItem = this.clickedItem.bind(this);
  }

  handleSearch(query) {
    if (!query) {
      return;
    }
    // Make a request for a user with a given ID
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=2a99618877f82a3aaaad30d1b669401a&query=${query}`)
      .then((response) => {
        // console.log(response.data.results);
        this.setState({options: response.data.results}, () => {
          console.log(this.state.options)
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  clickedItem(selectedItems){
    if(selectedItems[0] !== undefined) {
      console.log(selectedItems[0].id)
      this.props.setSelectedItem(selectedItems[0].id)
    }
  }

  renderMenuItemChildren(option, props, index) {
    return (
      <div key={option.id}>
        <img
          src={"http://image.tmdb.org/t/p/w185//" + option.poster_path}
          alt={option.title}
          style={{
            height: '24px',
            marginRight: '10px',
            width: '24px',
          }}
        />
        <span>{option.title}</span>
      </div>
    );
  }

  render() {
    return (
      <div className="search bar text-center">
        {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
        <AsyncTypeahead
          {...this.state}
          autoFocus
          delay= {1000}
          onChange={this.clickedItem}
          bsSize="large"
          labelKey="title"
          onSearch={this.handleSearch}
          options={this.state.options}
          placeholder="Search for a movie..."
          renderMenuItemChildren={this.renderMenuItemChildren}
        />
      </div>
    )
  }
}

export default SearchBar;
