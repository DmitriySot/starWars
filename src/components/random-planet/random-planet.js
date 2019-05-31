import React, { Component } from 'react';
import Spinner from '../spinner'
import ErrorIndicator from "../error-indicator"

import SwapiService from '../../services/swapi-service'

import './random-planet.css';
;

export default class RandomPlanet extends Component {
  swapiService = new SwapiService()

  state = {
    planet: null,
    loading: true,
    error: false
  }
  catchError = () => {
    this.setState({
      error: true,
      loading: false
    })
  }
  updatePlanet() {
    const id = Math.floor(Math.random() * 100 ) + 1
    this.swapiService.getPlanet(id).then((planet) => {
      this.setState({
        planet,
        loading: false
      })
    })
      .catch(this.catchError)
  }
  componentDidMount() {
    this.updatePlanet()
  }

  render() {

    const { planet, loading, error } = this.state
    const hasData = !(loading || error)
    const hasError = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Spinner /> : null
    const content = hasData ? <ViewPlanet planet={planet} /> : null

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
        {hasError}
      </div>

    );
  }
}

const ViewPlanet = ({planet}) => {
  const { id, name, population, rotationPeriod, diameter } = planet
  return (
    <>
      <img className="planet-image"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  )
}
