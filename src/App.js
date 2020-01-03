import React, { Component } from 'react'
import './App.css'
import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Grow,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const Loading = () => {
  return (
    <Skeleton
      variant='text'
      width='100%'
      height={18}
      style={{ margin: '14px 0' }}
    />
  )
}

const cityList = [
  'Warszawa',
  'Łódź',
  'Poznań',
  'Wrocław',
  'Lublin',
  'Rzeszów',
  'Bydgoszcz',
  'Szczecin',
  'Białystok',
  'Gdańsk',
  'Gorzów Wielkopolski',
  'Katowice',
  'Kielce',
  'Kraków',
  'Olsztyn',
  'Opole',
  'Toruń',
  'Zielona Góra'
]

const getUrlForCity = city =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pl&appid=44436d16bd424daef5fce773bf6fe022`
const iconUrl = 'http://openweathermap.org/img/wn/'

const localWeatherKey = 'weatherCity'

const IconWithDescription = ({ icon, description }) => (
  <div
    style={{
      flex: '0 1',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    }}
  >
    <img
      src={`${iconUrl}${icon}.png`}
      alt={description}
      style={{
        backgroundColor: 'lightskyblue',
        borderRadius: '50%',
        margin: 5,
        padding: 5
      }}
    />
    <span>{description}</span>
  </div>
)

class App extends Component {
  state = {
    data: null,
    isLoaded: false,
    city: ''
  }

  fetchCityFromLocalStorage() {
    let city = cityList[0]
    const localCity = localStorage.getItem(localWeatherKey)
    if (localCity !== null && cityList.indexOf(localCity) >= 0) {
      city = localCity
    }

    this.setState({
      city
    })
  }

  fetchWeatherForCity = () => {
    fetch(getUrlForCity(this.state.city))
      .then(response => response.json())
      .then(data =>
        this.setState({
          data,
          isLoaded: true
        })
      )
  }

  componentDidMount() {
    this.fetchCityFromLocalStorage()
    setTimeout(() => {
      this.fetchWeatherForCity()
    }, 1000)
  }

  handleChange = e => {
    const city = e.target.value
    this.setState({
      isLoaded: false,
      city: city
    })
    localStorage.setItem(localWeatherKey, city)
    setTimeout(() => this.fetchWeatherForCity(), 2000)
  }

  render() {
    const { data, isLoaded, city } = this.state
    const citySelect = cityList.map(item => (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    ))

    return (
      <div className='container bg'>
        <FormControl disabled={!isLoaded}>
          <InputLabel htmlFor='miasto'>Wybierz miasto</InputLabel>

          <Select onChange={this.handleChange} value={city}>
            {citySelect}
          </Select>
        </FormControl>
        {isLoaded ? (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ marginBottom: 0 }}>{city}</h1>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 24
              }}
            >
              {data.weather.map(weatherData => (
                <IconWithDescription key={weatherData.id} {...weatherData} />
              ))}
            </div>
          </div>
        ) : (
          <Grow in>
            <div
              className='container'
              style={{ alignItems: 'center', margin: '21.44px 0' }}
            >
              <Skeleton variant='text' width={210} height={60} />
              <Skeleton variant='circle' width={50} height={50} />
              <Skeleton variant='text' width={160} height={20} />
            </div>
          </Grow>
        )}
        {isLoaded ? (
          <Paper elevation={0}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Średnia temperatura</TableCell>
                  <TableCell align='right'>
                    {isLoaded ? `${data.main.temp} °C` : <Loading />}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant='footer'>Temperatura minimalna</TableCell>
                  <TableCell variant='footer' align='right'>
                    {isLoaded ? `${data.main.temp_min} °C` : <Loading />}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant='footer'>Temperatura maksymalna</TableCell>
                  <TableCell variant='footer' align='right'>
                    {isLoaded ? `${data.main.temp_max} °C` : <Loading />}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Ciśnienie</TableCell>
                  <TableCell align='right'>
                    {isLoaded ? `${data.main.pressure} hPa` : <Loading />}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Wilgotność</TableCell>
                  <TableCell align='right'>
                    {isLoaded ? `${data.main.humidity} %` : <Loading />}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Prędkość wiatru</TableCell>
                  <TableCell align='right'>
                    {isLoaded ? (
                      `${Math.round(data.wind.speed * 3.6)} m/s`
                    ) : (
                      <Loading />
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <React.Fragment>
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default App
