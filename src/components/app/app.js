import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';

class App extends Component {

  state = {
    personId: 3
  }

  onItemClick = (personId) => {
    console.log(personId)
    this.setState({personId})
  }

  render() {
    const {personId} = this.state
    return (
      <div>
        <Header/>
        <RandomPlanet/>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemClick={this.onItemClick}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={personId}/>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
