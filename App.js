import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, } from 'react-native';
import * as Location from 'expo-location';

import Weather from './components/Weather';
import WeatherScroll from './components/WeatherScroll';

const API_KEY = 'c16d2f62c5d3d5434f4ac207aa69c694';

export default function App() {
  let img = require('./assets/day.jpg')
  const [data, setData] = useState({});
  const [data_current, setData_current] = useState({});

  const [time, setTime] = useState('')
  if (time >= 18 | time <= 5) {
    img = require('./assets/night.jpg')
  } else {
    img = require('./assets/day.jpg')
  }
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        fetchDataFromApi("40.7128", "-74.0060")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
    setInterval(() => {
      const time = new Date();
      const hour = time.getHours();
      setTime(hour) 
      
     
  }, 1000);
  }, [])
  
  const fetchDataFromApi = (latitude, longitude) => {
    if (latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        // document.write(data.timezone)
        setData(data)
      })
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data_current => {

        console.log(data_current)
        // document.write(data.timezone)
        setData_current(data_current)
      })
    }

  }
  return (

    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <Weather current={data_current} cur={data.current} />
        {/* <DailyScroll weatherData={data.hourly} current={data.current}/> */}
        <WeatherScroll weatherData={data} current={data.current} />
        <Text style={styles.menu}>PINEAPPLE</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  menu: {
    // flex:,
    textAlign: 'center',
    flexGrow: 0.1,
    color: '#eee',
    fontSize: 20,
    // fontWeight: '100',
    padding: 10
  }
});