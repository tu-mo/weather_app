import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, Platform, ScrollView, useWindowDimensions, TextInput, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { EvilIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import Weather from './components/Weather';
import WeatherScroll from './components/WeatherScroll';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  let img = require('./assets/day.jpg')
  const [data, setData] = useState({});
  const [data_current, setData_current] = useState({});
  const [air, setAir] = useState({});

  const [data1, setData1] = useState({});
  const [data_current1, setData_current1] = useState({});
  const [air1, setAir1] = useState({});

  const [city, setCity] = useState({});

  let Locations = [
    {
      d: data,
      c: data_current
    }
  ];
  let x = { d: data1, c: data_current1 }
  Locations.push(x)


  const [time, setTime] = useState('')
  if (time >= 18 | time <= 5) {
    img = require('./assets/night.jpg')
  } else {
    img = require('./assets/day.jpg')
  }
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        fetchDataFromApi("40.7128", "-74.0060")
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
      fetchData(city)

      await Notifications.scheduleNotificationAsync({
        identifier: "identifier1",
        content: {
          title: 'Weather in ${location.name}',
          body: "${location.weather[0].description} - ${location.temp.min} -${location.temp.max}°C - Now: ${location.temp}°C "
        },
        trigger: {
          hour: 7,
          minute: 0,
          repeats: true,
        },
      });
      await Notifications.scheduleNotificationAsync({
        identifier: "identifier1",
        content: {
          title: 'Weather in ${location.name}',
          body: "${location.weather[0].description} - ${location.temp.min} -${location.temp.max}°C - Now: ${location.temp}°C "
        },
        trigger: {
          hour: 19,
          minute: 0,
          repeats: true,
        },
      });
    })();
    setInterval(() => {
      const time = new Date();
      const hour = time.getHours();
      setTime(hour)
    }, 1000);

    const firebaseConfig = {
      apiKey: "AIzaSyCdPKgxF-UglUCDsyHA78AfIK7UZfClbNo",
      authDomain: "weather-app-e383e.firebaseapp.com",
      databaseURL: "https://weather-app-e383e-default-rtdb.firebaseio.com",
      projectId: "weather-app-e383e",
      storageBucket: "weather-app-e383e.appspot.com",
      messagingSenderId: "204459547918",
      appId: "1:204459547918:web:c4bc6fb20993e727118b5f",
      measurementId: "G-4690FL4RDJ"
    };
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    GET_DB();

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])

  const GET_DB = () => {
    const db = getDatabase();
    const starCountRef = ref(db, 'city/');
    onValue(starCountRef, (snapshot) => {
      var i = 0
      let item_data = snapshot.val();
      let data_temp = []
      data_temp.push({
        id: Object.keys(item_data)[i],
        name: Object.values(item_data)[i].City
      })
        ;
      setData(data_temp)
    })

  }
  const addCity = (cityName) => {
    const db = getDatabase();
      push(ref(db, 'city/'), {
        City: cityName
      })
    }


  const fetchDataFromApi = (latitude, longitude) => {
    if (latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
        setData(data)
      })
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data_current => {
        setData_current(data_current)
      })
      fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(air => {
        setAir(air)
      })
    }
  }

  const fetchData = (city) => {

    let x = 0;
    let y = 0;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data_current => {
      x = data_current.latitude
      y = data_current.longitude
      setData_current1(data_current)
    })

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${x}&lon=${y}&exclude=minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
      setData1(data)
    })
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${x}&lon=${y}&exclude=minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(air => {
      console.log(air)
      setAir1(air)
    })
  }


  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  return (
    <ScrollView
      horizontal={true}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    >
      {Locations.map((location) => {

        return (
          <>
            <View style={{ width: windowWidth, height: windowHeight }}>
              <ImageBackground source={img} style={styles.image}>
                <View style={styles.searchbar}>
                  <TextInput
                    placeholder='Enter city name'
                    value={city}
                    onChangeText={(text) => setCity(text)}
                  />
                  <EvilIcons name="search" size={28} color="black" onPress={() => fetchData(city)z} />
                </View>
                <View style={{ marginTop: 95 }}></View>
                <Weather current={data_current} cur={data.current} />
                <WeatherScroll weatherData={data} current={data.current} air={air} />
                <Text style={styles.menu}>PINEAPPLE</Text>
              </ImageBackground>
            </View>

            <View style={{ width: windowWidth, height: windowHeight }}>
              <ImageBackground source={img} style={styles.image}>

                <Weather current={data_current1} cur={data1.current} />
                <WeatherScroll weatherData={data1} current={data1.current} air={air1} />
                <Text style={styles.menu}>PINEAPPLE</Text>
              </ImageBackground>
            </View>
          </>
        );

      })}
    </ScrollView>
  );
}
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
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
    textAlign: 'center',
    color: '#eee',
    fontSize: 20,
  },
  
  searchbar: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width - 20,
    borderWidth: 1.5,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: 'gray',
    borderColor: 'gray'
  }
});