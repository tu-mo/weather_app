import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const WeatherItem = ({ value, unit }) => {
    return (
        
            <Text style={styles.temp}>{value}{unit}</Text>
        
    );
}
const DateTime = ({ current, cur }) => {
    return (
        <View style={styles.container}>
            
            <View style={styles.centerAlign}>
                {/* <Text style={styles.timezone}>{timezone}</Text> */}
                <Text style={styles.city}>{current.name}</Text>
                <Text style={styles.des}>{cur ? cur.weather[0].description.charAt(0).toUpperCase() + cur.weather[0].description.slice(1) : ""}</Text>
                <WeatherItem value={cur ? Math.round(cur.temp) : ""} unit="&#176;"/>
                {/* <Text style={styles.day}>{current ? Math.round(current.temp) : ""}{unit}</Text> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.6,
        flexDirection: "row",
        // justifyContent: "s"
    },
    
    centerAlign: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        // textAlign: 'center',
        marginTop: 20,
        // alignContent: 'center'
    },
    city: {
        fontSize: 50,
        color: "white",
        fontWeight: "500",
    },
    des: {
        fontSize: 25,
        color: "white",
        // fontWeight: "300",
    },
    temp: {
        fontSize: 60,
        color: "white",
        // fontWeight: "500",
        // alignContent:'center',
        // justifyContent: 'center',
        // alignItems: 'center',
    }
})

export default DateTime
