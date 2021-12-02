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
            {/* <Text  style={styles.day}>{moment(hourlyItem.dt * 1000).format('ddd')}</Text> */}
            <Text style={styles.day}>{next < 10 ? '0' + next : next}</Text>
            <Image source={img} style={styles.image} />
            {/* <Text  style={styles.temp}>Night - {hourlyItem.temp.night}&#176;C</Text> */}
            <Text style={styles.temp}>{Math.round(hourlyItem.temp)}&#176;</Text>

        </View>
    )
}

export { FutureHourly, FutureDaily }

const styles = StyleSheet.create({
    image: {
        // flex:1,
        // flexGrow:1,
        width: 30,
        height: 30,
        // textAlign:"center"
    },
    dailyItem: {
        flex: 2,
        flexGrow: 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#00000033',
        // borderRadius:10,
        // borderColor:"#eee",
        // borderWidth:1,
        paddingTop: 5,
        paddingBottom:5
        // marginLeft: 10
    },
    hourlyItem: {
        // flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        // backgroundColor: '#00000033',
        alignItems: 'center',
        // borderRadius:10,
        // borderColor:"#eee",
        // borderWidth:1,
        padding: 20,
        // marginLeft: 10
    },
    day: {
        fontSize: 20,
        color: "white",
        // backgroundColor: "#3c3c44",
        // padding: 10,
        // textAlign:'center',
        // borderRadius: 50,
        fontWeight: "500",
        // marginBottom: 15
    },
    temp: {
        fontSize: 20,
        color: "white",
        fontWeight: "500",
        // textAlign:"center"
    },
})

