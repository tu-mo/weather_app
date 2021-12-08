import React from 'react'
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native'
import { FutureDaily, FutureHourly } from './FutureForecast'
import moment from 'moment-timezone'

const WeatherScroll = ({ weatherData, current }) => {
    return (
        <>
            <View>
                <WeatherToday data={weatherData.daily} />
            </View>
            <ScrollView horizontal={true} style={styles.scrollViewRow}>
                <CurrentTemp data={current} />
                <FutureHourly data={weatherData.hourly} />
            </ScrollView>
            <ScrollView horizontal={false} style={styles.scrollViewColumn}>
                {/* <CurrentWea  data={weatherData && weatherData.length > 0 ? weatherData[0] : {}}/> */}
                <FutureDaily data={weatherData.daily} />
                <View style={styles.day}>
                    <View style={styles.line_top}></View>
                    <WeatherItem title="Sunrise" value={current ? moment.tz(current.sunrise * 1000, weatherData.timezone).format('HH:mm') : ""} unit=" am" />
                    <WeatherItem title="Sunset" value={current ? moment.tz(current.sunset * 1000, weatherData.timezone).format('HH:mm') : ""} unit=" pm" />
                    <WeatherItem title="Humidity" value={current ? current.humidity : ""} unit='%' />
                    <WeatherItem title="Pressure" value={current ? current.pressure : ""} unit=" hPA" />
                    <WeatherItem title="Feels like" value={current ? Math.round(current.feels_like) : ""} unit="&#176;" />
                    <WeatherItem title="Uvi" value={current ? current.uvi : ""} unit="" />
                    <WeatherItem title="Wind speed" value={current ? Math.round(current.wind_speed * 3.6 * 10) / 10  : ""} unit=" km/h" />
                    <WeatherItem title="Visibility" value={current ? Math.round(current.visibility / 1000 * 10) / 10 : ""} unit="km" />
                </View>
            </ScrollView>
            
        </>
    )
}
const WeatherItem = ({ title, value, unit }) => {
    return (
        <View style={styles.today_scroll}>
            <Text style={styles.day_mini}>{title}</Text>
            <Text style={styles.day_mini}>{value}{unit}</Text>
        </View>
    );
}
const WeatherToday = ({ data }) => {
    return (
        <View>

            {
                data && data.length > 0 ?

                    data.map((data, id) => (

                        (id == 0) && <TodayItem key={id} todayItem={data} />
                    ))
                    :
                    <View />
            }

        </View>
    )
}

const TodayItem = ({ todayItem }) => {
    const img = { uri: "http://openweathermap.org/img/wn/" + todayItem.weather[0].icon + "@2x.png" }
    return (
        <View style={styles.today}>
            <Text style={styles.day}>{moment(todayItem.dt * 1000).format('ddd')}    Today</Text>

            {/* <Image source={img} style={styles.image} /> */}
            {/* <Text  style={styles.temp}>Night - {dailyItem.temp.night}&#176;C</Text> */}
            <Text style={styles.day}>{Math.round(todayItem.temp.max)}  {Math.round(todayItem.temp.min)}</Text>

        </View>
    )
}
const CurrentTemp = ({ data }) => {
    if (data && data.weather) {
        const img = { uri: 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png' }
        return (
            <View style={styles.currentTempContainer}>
                <Text style={styles.day}>Now</Text>
                <Image source={img} style={styles.image} />
                {/* <Text  style={styles.day}>{moment(data.dt * 1000).format('dddd')}</Text> */}
                <Text style={styles.day}>{Math.round(data.temp)}&#176;</Text>
                {/* <Text  style={styles.temp}>Day - {data.temp.day}&#176;C</Text> */}

            </View>
        )
    } else {
        return (
            <View>

            </View>
        )
    }
}

export default WeatherScroll

const styles = StyleSheet.create({
    scrollViewRow: {
        flex: 0.4,
        flexGrow: 0.2,
        // backgroundColor: '#00000033',
        // padding:20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',

    },
    scrollViewColumn: {
        flex: 1,
        flexGrow: 0.8,
        // backgroundColor: '#00000033',
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    today: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#00000033',
        // borderRadius:10,
        // borderColor:"#eee",
        // borderWidth:1,
        paddingLeft: 20,
        paddingRight: 20,
        
    },
    today_scroll: {
        backgroundColor: '#00000033',
        // borderTopWidth: 1,
        // borderColor: '#eee',
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // justifyContent:'space-between'
    },
    line_top: {
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    image: {
        width: 40,
        height: 40
    },
    currentTempContainer: {
        flexDirection: 'column',
        // backgroundColor: '#00000033',
        justifyContent: "center",
        alignItems: 'center',
        // borderRadius: 10,
        // borderColor:'#eee',

        // borderWidth:1,
        padding: 20
    },
    day: {
        fontSize: 20,
        color: "white",
        // backgroundColor: "#3c3c44",
        // padding: 10,
        // textAlign:"center",
        // borderRadius: 50,
        fontWeight: "700",
        // marginBottom: 15
    },
    day_mini: {
        paddingLeft: 40,
        paddingRight: 40,
        fontSize: 20,
        color: "white",
        fontWeight: "500",
        // textAlign:"center"
    },
    otherContainer: {
        paddingRight: 40
    }
})

