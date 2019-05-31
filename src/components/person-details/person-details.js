import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'


import './person-details.css';

export default class PersonDetails extends Component {
  swapiService = new SwapiService()

  state = {
    person : null
  }
  componentDidMount() {
    this.updatePerson()
  }

  updatePerson() {
    const {personId} = this.props

    this.swapiService.getPerson(personId).then((person) => {
      console.info("__person__", person)
      this.setState({person})
    })
  }

  componentDidUpdate(prevProps) {
    console.info("__this.props__", this.state)
    if (prevProps.personId !== this.props.personId) {
      this.updatePerson()
    }
  }

  render() {
    const { person } = this.state


    if(!person) {
      return <Spinner/>
    }
    const { id, name, gender, birthYear, eyeColor } = person
    console.info("__person__", person)
    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
