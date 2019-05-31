import React, { Component } from 'react';
import Spinner from '../spinner'

import SwapiService from '../../services/swapi-service'

import './item-list.css';

export default class ItemList extends Component {

  swapiService = new SwapiService()

  state = {
    itemList: null
  }

  componentDidMount() {
    this.updateItemList()
  }

  updateItemList() {
    this.swapiService.getAllPeople().then((itemList) => {
      this.setState({ itemList })
    })
  }

  getList(arr) {
    // console.log(arr)
    return arr.map(({name, id}) => {
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemClick(id)}>
          {name}
        </li>
      )
    })
  }

  render() {
    const {itemList} = this.state
    if(!itemList) {
      return <Spinner />
    }


    const items = this.getList(itemList)

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}
