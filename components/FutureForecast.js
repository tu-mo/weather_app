import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import moment from 'moment-timezone'

const FutureDaily = ({ data }) => {
    return (
        <View style={{ flexDirection: 'column' }}>

            {
                data && data.length > 0 ?

                    data.map((data, id) => (

                        (id > 0) && <FutureDailyItem key={id} dailyItem={data} />
                    ))
                    :
                    <View />
            }
        </View>
    )
}

const FutureDailyItem = ({ dailyItem }) => {
    const img = { uri: "http://openweathermap.org/img/wn/" + dailyItem.weather[0].icon + "@2x.png" }
    return (
        <View style={styles.dailyItem}>
            <Text style={styles.day}>{moment(dailyItem.dt * 1000).format('ddd')}</Text>
            <Image source={img} style={styles.image} />
            {/* <Text  style={styles.temp}>Night - {dailyItem.temp.night}&#176;C</Text> */}
            <Text style={styles.temp}>{Math.round(dailyItem.temp.max)}  {Math.round(dailyItem.temp.min)}</Text>

        </View>
    )
}

const FutureHourly = ({ data }) => {
    const time = new Date();
    const hour = time.getHours();
    return (
        <View style={{ flexDirection: 'row' }}>

            {
                data && data.length > 0 ?

                    data.map((data, idx) => (

                        idx < 24 && <FutureHourlyItem hourlyItem={data} key={idx} next={(hour + idx + 1) < 24 ? (hour + idx + 1) : ((hour + idx + 1) - 24)} />
                    ))
                    :
                    <View />
            }
        </View>
    )
}

const FutureHourlyItem = ({ next, hourlyItem }) => {
    const img = { uri: "http://openweathermap.org/img/wn/" + hourlyItem.weather[0].icon + "@2x.png" }
    return (
        <View style={styles.hourlyItem}>
            <Text style={styles.day}>{next < 10 ? '0' + next : next}</Text>
            <Image source={img} style={styles.image} />
            <Text style={styles.temp}>{Math.round(hourlyItem.temp)}&#176;</Text>

        </View>
    )
}

export { FutureHourly, FutureDaily }
const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        justifyContent: 'space-between',
        resizeMode: 'contain'
    },
    dailyItem: {
        flex: 2,
        flexGrow: 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlignVertical: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    hourlyItem: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    day: {
        fontSize: 20,
        color: "white",
        width: 50,
        textAlign: 'left',
        fontWeight: "500",
    },
    temp: {
        fontSize: 20,
        color: "white",
        fontWeight: "500",
    },
})

