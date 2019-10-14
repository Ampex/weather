import React, { Component } from 'react'
import './App.css'
import { Paper, Table, TableRow, TableBody, TableCell, CircularProgress, Grow, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const Circle = () => {
  return ( <CircularProgress size='24px' /> )
}

class App extends Component {

  state = {
    data: null,
    isLoaded: false,
    city: 'Warszawa',
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
      city: e.target.value,
    })
    setTimeout(() => {
      fetch (this.state.url)
      .then(response => response.json())
      .then(data => this.setState ({
        data,
        isLoaded: true,
        url: `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&lang=pl&appid=44436d16bd424daef5fce773bf6fe022`
      }))
    }, 2000)
  }

  render() {
    const { data, isLoaded, city } = this.state
    const url = 'http://openweathermap.org/img/wn/'
    const icon = data ? url+data.weather[0].icon+'.png' : <Circle/>
    const description = data ? data.weather[0].description : <Circle/>
    const img = <img alt={description} src={icon} />
    const cityList = ['Warszawa', 'Łódź', 'Poznań', 'Wrocław', 'Lublin', 'Rzeszów', 'Bydgoszcz', 'Szczecin', 'Białystok', 'Gdańsk', 'Gorzów Wielkopolski', 'Katowice', 'Kielce', 'Olsztyn', 'Opole', 'Toruń', 'Zielona Góra']
    const citySelect = cityList.map(item => {
      return (
        <MenuItem key={item} value={item}>{item}</MenuItem>
      )
    })    
    
    return (
      <div className="container">
        <FormControl disabled={isLoaded ? false : true}>

          <InputLabel htmlFor='miasto'>Wybierz miasto</InputLabel>

          <Select onChange={this.handleChange} value={city}>
          {citySelect}
          </Select>

        </FormControl>
        {isLoaded ? <Grow  in>
          <div style={{textAlign: 'center'}}>
            <h1 style={{marginBottom:0}}>{city}</h1>
            <p style={{marginTop:0}}>{description}</p>
            <p style={{marginTop:0}}>{img}</p>
          </div>
        </Grow> :
        <Grow in>
          <div className='container' style={{alignItems: 'center', margin: '20px 0'}}><Skeleton variant='text' width={210} height={20} />
          <Skeleton variant='text' width={160} height={10} />
          <Skeleton variant='circle' width={40} height={30} /></div>
          </Grow>
        }
        
        <Paper>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Średnia temperatura</TableCell>
                <TableCell align='right'>{isLoaded ? `${data.main.temp} °C` : <Circle/>}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell variant='footer'>Temperatura minimalna</TableCell>
                <TableCell variant='footer' align='right'>{isLoaded ? `${data.main.temp_min} °C` : <Circle/>}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant='footer'>Temperatura maksymalna</TableCell>
                <TableCell variant='footer' align='right'>{isLoaded ? `${data.main.temp_max} °C` : <Circle/>}</TableCell>
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