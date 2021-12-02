import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const WeatherItem = ({ value, unit }) => {
    return (
        
            <Text style={styles.day}>{value}{unit}</Text>
        
    );
}
const DateTime = ({ current, lat, lon }) => {
   let unit = "&#176;"
    return (
        <View style={styles.container}>
            
            <View style={styles.centerAlign}>
                {/* <Text style={styles.timezone}>{timezone}</Text> */}
                <Text style={styles.day}>{lat}N {lon}E</Text>
                <Text style={styles.day}>{current ? current.weather[0].description : ""}</Text>
                <WeatherItem value={current ? current.feels_like : ""} unit="&#176;"/>
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
    day: {
        fontSize: 30,
        color: "white",
        fontWeight: "500",
    }
})

export default DateTime
