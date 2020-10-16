import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { API_ARTIST, API_TRACK, API_IMAGE, PRIMARY_COLOR, SECONDARY_COLOR, DEFAULT_IMAGE } from "../../util/constants";
import { getService } from "../../util/httpUtil";
import { Loading } from "../loading";
import { setOneGeo } from "../../redux/actions";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useCover } from "../../hooks/useCover";
import { secondsToMinutes } from "../../util/Util";

export const Geo = ({ track: { name, duration, image, artist, url } }) => {

    const [loading, setLoading] = useState(false)
    const [img, setImg] = useState('')
    const [info, setInfo] = useState({name, duration, image, artist, url})
    const nameArtist = artist.name

    useEffect(() => {
        callImage()
    }, [])

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const cover = useCover()

    const callImage = async () => {
        setLoading(true)
        const api_request = `${API_IMAGE}${API_TRACK}${name}${API_ARTIST}${nameArtist}`
        const response = await getService(api_request)
        if(response){
            const { track } = response
            setInfo({...info, track})
            const result = cover(image, track, 1)
            setImg(result)
            setLoading(false)
        } else {
            setInfo({...info, image: DEFAULT_IMAGE})
            setImg(DEFAULT_IMAGE)
        }
    }

    const navigateTrack = () => {
        dispatch(setOneGeo(info))
        navigation.navigate('detail')
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.containerInfo} onPress={navigateTrack}>
                {loading ? <Loading /> : <Image source={{ uri: `${img}` }} style={styles.imgStyle}></Image>}
                <View style={styles.containerTexts}>
                    <Text style={styles.textStyle}>{name}</Text>
                    <Text style={styles.textSubtitle}>{artist.name}</Text>
                    <Text style={styles.textTime}>Duración: {secondsToMinutes(duration)}</Text>
                </View>
                <View>
                    <Icon name="arrow-right" size={20} color={SECONDARY_COLOR} />
                </View>
            </Pressable>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    containerInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 30,
        marginTop: 6,
        paddingRight: 30
    },
    imgStyle: {
        width: 70,
        height: 70,
        marginRight: 20
    }, 
    containerTexts: {
        flex: 1
    },
    textStyle: {
        fontSize: 18 
    },
    textSubtitle: {
        fontSize: 14,
        color: PRIMARY_COLOR
    },
    textTime: {
        fontSize: 12
    }
})