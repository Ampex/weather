import React, { Component } from 'react'
import './App.css'
import { Paper, Table, TableRow, TableBody, TableCell, CircularProgress, Grow, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'

const Circle = () => {
  return (
      <CircularProgress size='24px' />    
  )
}

class App extends Component {

  state = {
    data: null,
    isLoaded: false,
    country: 'Warszawa',
    url: 'https://api.openweathermap.org/data/2.5/weather?q=Warszawa&units=metric&lang=pl&appid=44436d16bd424daef5fce773bf6fe022'
  }

  componentDidMount() {
    setTimeout(() => {
      fetch(this.state.url)
      .then(response => response.json())
      .then(data => this.setState ({ data, isLoaded: true }))
    }, 2000)
  }

  handleChange = async e => {
    this.setState ({
      isLoaded: false,
      country: e.target.value,
    })
    setTimeout(() => {
      fetch (this.state.url)
      .then(response => response.json())
      .then(data => this.setState ({
        data,
        isLoaded: true,
        url: `https://api.openweathermap.org/data/2.5/weather?q=${this.state.country}&units=metric&lang=pl&appid=44436d16bd424daef5fce773bf6fe022`
      }))
    }, 2000)
  }

  render() {
    const { data, isLoaded, country } = this.state
    const url = 'http://openweathermap.org/img/wn/'
    const icon = data ? url+data.weather[0].icon+'.png' : <Circle/>
    const description = data ? data.weather[0].description : <Circle/>
    const img = <img alt={description} src={icon} />
    
    return (
      <div className="container">
        <FormControl>

          <InputLabel htmlFor='miasto'>Wybierz miasto</InputLabel>

          <Select
          onChange={this.handleChange}
          value={country}
          >
            <MenuItem value='Warszawa'>Warszawa</MenuItem>
            <MenuItem value='Lublin'>Lublin</MenuItem>
            <MenuItem value='Lódź'>Łódź</MenuItem>
            <MenuItem value='Szczecin'>Szczecin</MenuItem>
            <MenuItem value='Cyców'>Cyców</MenuItem>
          </Select>

        </FormControl>
        
        <h1 style={{marginBottom:0}}>{country}</h1>
        <p style={{marginTop:0}}>Aktualna pogoda</p>
        <Paper>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>{description}</TableCell>
                <TableCell align='right'>{isLoaded ? <Grow in>{img}</Grow> : <Circle />}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Temperatura</TableCell>
                <TableCell align='right'>{isLoaded ? `${data.main.temp} °C` : <Circle/>}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ciśnienie</TableCell>
                <TableCell align='right'>{isLoaded ? `${data.main.pressure} hPa` : <Circle/>}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Wilgotność</TableCell>
                <TableCell align='right'>{isLoaded ? `${data.main.humidity} %` : <Circle/>}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Prędkość wiatru</TableCell>
                <TableCell align='right'>{isLoaded ? `${Math.round(data.wind.speed * 3.6)} m/s` : <Circle/>}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>      
    )
  }
}

export default App