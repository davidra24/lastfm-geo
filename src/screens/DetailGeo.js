import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, Pressable, Linking, ScrollView } from "react-native";
import { useSelector } from 'react-redux';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../util/constants';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { call } from 'react-native-reanimated';
import { Loading } from '../components/loading';
import { useCover } from '../hooks/useCover';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { secondsToMinutes } from '../util/Util';

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

export const DetailGeo = () => {
    const oneGeo = useSelector(state => state.oneGeo)
    const { name, duration, image, artist, track, url } = oneGeo
    const [img, setImg] = useState(image[3]['#text'])
    const [loading, setLoading] = useState(false)
    const cover = useCover()
    const navigation = useNavigation()

    const callImage = async () => {
        setLoading(true)
        const result = cover(image, track, 3)
        setImg(result)
        setLoading(false)
    }

    useEffect(() => {
        callImage()
    }, [])

    const goBack = () => navigation.goBack()

    return (
        <ParallaxScrollView
            backgroundColor={PRIMARY_COLOR}
            parallaxHeaderHeight={300}
            stickyHeaderHeight={50}
            renderStickyHeader={() =>
                <View style={styles.containerHeader}>
                    <View style={styles.stickHeader}>
                        <Text style={{ color: 'white' }}>{`${artist.name} - ${name}`}</Text>
                    </View>
                </View>
            }
            renderForeground={() => (
                <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {loading ? <Loading text={name} /> : <Image source={{ uri: `${img}` }} style={styles.imgStyle}></Image>}
                </View>
            )}
            renderFixedHeader={() => (
                <View style={styles.fixedHeader}>
                    <Icon name="arrow-left" size={20} color='#3182ce' onPress={() => goBack()} />
                </View>)
            }>
            <View style={styles.container}>
                <Text style={styles.nameTrack}>{name}</Text>
                <Text style={styles.textSubtitle}>{artist.name}</Text>
                <Text style={styles.textTime}>Duración: {secondsToMinutes(duration)}</Text>
                <Text style={styles.textPublished}>Publicado: {track.wiki?track.wiki.published:'N/A'}</Text>
                <View style={styles.containerGo}>
                    <ScrollView horizontal>
                        <Pressable style={styles.contentGo} onPress={() => Linking.openURL(track.url)}>
                            <Text style={styles.textContent}>Ir a canción</Text>
                        </Pressable>
                        <Pressable style={styles.contentGo} onPress={() => Linking.openURL(artist.url)}>
                            <Text style={styles.textContent}>Ir a artista</Text>
                        </Pressable>
                        {track.album && <Pressable style={styles.contentGo} onPress={() => Linking.openURL(track.album.url)}>
                            <Text style={styles.textContent}>Ir a album</Text>
                        </Pressable>}
                    </ScrollView>
                    <Text style={styles.summary}>
                        {track.wiki?track.wiki.summary:'N/A'}
                    </Text>
                </View>
            </View>
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    imgStyle: {
        width: imageWidth,
        height: imageWidth
    },
    container: {
        alignItems: 'center',
    },
    nameTrack: {
        fontSize: 30
    },
    textSubtitle: {
        fontSize: 25,
        color: SECONDARY_COLOR
    },
    textTime: {
        fontSize: 18
    },
    textPublished: {
        fontSize: 16
    },
    containerHeader: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 10,
    },
    stickHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    fixedHeader: {
        position: 'absolute',
        bottom: 18,
        left: 10
    },
    iconBack: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    containerGo: {
        flex: 1,
        alignItems: 'center',
        marginTop: 2
    },
    contentGo: {
        width: 160,
        height: 150,
        backgroundColor: PRIMARY_COLOR,
        margin: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    textContent: {
        color: 'white',
        fontSize: 20
    },
    summary: {
        fontSize: 18,
        marginTop: 5
    }
})