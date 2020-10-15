import React from 'react'
import { View, Text, SafeAreaView, FlatList, StyleSheet, ScrollView } from "react-native";
import { Geo } from '../components/geos/Geo';

export const GeoContainer = ({ geos: { tracks: { track } } }) =>
    (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                {track.map(geo => (
                    <Geo key={geo.url} track={geo} />
                ))}
            </ScrollView>            
        </View>
    )


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    scroll: {
        flexGrow: 1
    }
})