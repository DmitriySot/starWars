export default class SwapiService {

  _apiBase = 'https://swapi.co/api'
  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`)
    if(!res.ok) {
      console.log(`Could not fetch ${url}`)
    }
    return res.json()
  }

  getAllPeople = async () => {
    const res = await this.getResource('/people/')
    //console.log(res.results, 'res--------')
    const allPeople = res.results
    // console.log(allPeople, '-=-=-=-')
    return allPeople.map(this.transformPerson)
  }
  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`)
    return this.transformPerson(person)
  }
  getAllPlanet = async () => {
    const res = await this.getResource('/planets/')
    return res.results.map(this.transformPlanet)
  }
  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`)
    return this.transformPlanet(planet)
  }
  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`)
    return res.results.map(this.transformStarship)
  }
  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}`)
    return this.transformStarship(starship)
  }
  _extractId = (item) => {
    if(!item.url ) {
      return 1
    }
      console.log(item.url, 'extractId----------')
    const idRegExp = /\/([0-9]*)\/$/
    return item.url.match(idRegExp)[1]
  }

  transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotationPeriod,
      diameter: planet.diameter
    }
  }
  transformPerson = (person) => {
     console.log(person, 'person')
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  }
  transformStarship(starship) {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    }
  }
}
