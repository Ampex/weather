import React, { Component } from 'react'
import './App.css'
import Weather from './weather.json'

class App extends Component {

  state = {
    data: {}
  }

  componentDidMount() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Warsaw&units=metric&appid=44436d16bd424daef5fce773bf6fe022'
    fetch(url)
    .then(data => this.setState ({ data }))
    console.log(Weather)
  }

  render() {
        return (
      <div className="container">
        
      </div>      
    )
  }
}

export default App

// 790 838 616