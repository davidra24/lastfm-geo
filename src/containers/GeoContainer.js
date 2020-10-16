import React, { useState } from 'react'
import { View, Text, TextInput, SafeAreaView, FlatList, StyleSheet, ScrollView } from "react-native";
import { Geo } from '../components/geos/Geo';
import { Loading } from '../components/loading';
import { useSearchTracks } from "../hooks/useFilter";


export const GeoContainer = ({ geos, setPage, page, loading }) => {
    console.disableYellowBox = true
    const { query, setQuery, filteredTracks } = useSearchTracks(geos)
    const renderItem = ({ item }) => (
        <Geo track={item} style={styles.borderItem} />
    )
    const handleLoadMore = () => {
        if(!query && !loading){
            setPage(page + 1)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.borderStyle}>
                <TextInput placeholder="Filtrar" style={styles.textInput} value={query} onChange={(event) => {
                    const {eventCount, target, text} = event.nativeEvent;
                    setQuery(text)
                }} />
            </View>
            <FlatList style={styles.scroll}
                data={filteredTracks}
                renderItem={
                    renderItem
                }
                keyExtractor={item => item.url}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    scroll: {
        flexGrow: 1
    },
    borderStyle:{
        borderStyle: 'solid',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 10,
        borderColor: '#ccc',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10
    },
    textInput:{},
    borderItem:{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
})