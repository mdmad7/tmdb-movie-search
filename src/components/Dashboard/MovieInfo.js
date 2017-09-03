import React from 'react';
import moment from 'moment';

class MovieInfo extends React.Component {
  renderRating() {
    let rating = this.props.fetchedItem.releases.countries.find(x => x.iso_3166_1 === "US")
    return rating.certification
  }

  renderDirector() {
    let director = this.props.fetchedItem.credits.crew.find(x => 
      x.job === "Director")

    return director.name
  }

  renderWriter() {
    let writer = this.props.fetchedItem.credits.crew.find(x => 
      x.job === "Writer")
    
    if (writer !== undefined ) {
      return writer.name
    } else {
      return '-';
    }
 
  }

  renderCast() {
    let cast = this.props.fetchedItem.credits.cast.slice(0,5)
    return cast.map((actor) => {
      return <li key={actor.id}>{actor.name}</li>
    })
  }

  render() {
    const imgBg = "http://image.tmdb.org/t/p/w342//" + this.props.fetchedItem.poster_path;

    const {fetchedItem} = this.props;
  return (
    <div className="row movie">
      <div className="col-md-5 no-padding">
        <img className="poster" src={imgBg} alt={fetchedItem.title + ' poster'}/>
      </div>
      <div className="col-md-7 no-padding">
        <div className="info-section">
          <h2>{fetchedItem.title} <span>/ {moment(fetchedItem.release_date).format('YYYY')}</span></h2>
          <div className="below-title">
            <span>{this.renderRating()} / </span>
            <span>{fetchedItem.genres[0].name}</span>
            <span> / {fetchedItem.runtime} min</span>  
          </div> 
          <p className="preview">{fetchedItem.overview}</p>
          <div className="row lists">
            <div className="col-md-6">
            <h6>Starring</h6>
            <ul>{this.renderCast()}</ul>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-12">
                  <h6>Director</h6>
                  <span className="li">{this.renderDirector()}</span>
                </div>
                <div className="col-12">
                  <h6 className="writer">Writer</h6>
                  <span className="li">{this.renderWriter()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br /><br /><br />
        <div className="row scores">
          <div className="col-4 text-center score">
            <h6>popularity</h6>
            <h4>{(fetchedItem.popularity).toFixed(2)}</h4>
          </div>
          <div className="col-4 text-center score center-score">
            <h6>votes avg.</h6>
            <h4>{fetchedItem.vote_average}</h4>
          </div>
          <div className="col-4 text-center score">
            <h6>votes count</h6>
            <h4>{fetchedItem.vote_count}</h4>
          </div>
        </div>
      </div>
    </div>
  )
  }
}

export default MovieInfo;