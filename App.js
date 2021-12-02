import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, } from 'react-native';
import * as Location from 'expo-location';

import DateTime from './components/DateTime';
import WeatherScroll from './components/WeatherScroll';

const API_KEY = 'c16d2f62c5d3d5434f4ac207aa69c694';

export default function App() {
  const [data, setData] = useState({});

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
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if (latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        // document.write(data.timezone)
        setData(data)
      })
    }

  }
  return (

    <View style={styles.container}>
      <ImageBackground source={require('./assets/cloudy.jpeg')} style={styles.image}>

        <DateTime current={data.current} lat={data.lat} lon={data.lon} />
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
