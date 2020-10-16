import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { GeoContainer } from "../containers/GeoContainer";
import { useSelector, useDispatch } from "react-redux";
import { getService } from '../util/httpUtil';
import { API_COUNTRY, API_PAGE, API_PATH } from '../util/constants';
import { Loading } from '../components/loading';
import { Database } from '../db';

export const Main = () => {
  const actualPage = useSelector(state => state.actualPage)
  const dispatch = useDispatch()
  const { container, centerLoading, noSync } = styles
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [geos, setGeos] = useState([])
  const [country, setCountry] = useState('spain')

  useEffect(() => {
    callApi()
    const db = new Database()
  }, [page])

  const callApi = async () => {
    setLoading(true)
    const db = new Database()
    const response = await getService(`${API_PATH}${API_COUNTRY}${country}${API_PAGE}${page}`)
    if(response){
      const {tracks: {track}} = response
      db.insertGeo(track)
      setGeos([ ...geos, ...track])
      setLoading(false) 
    } else {
      const tracks = await db.getGeo()
      setGeos(tracks)
      setLoading(false) 
    }
  }

  return (
    <View style={container}>
      {
        <>
          {
            geos === undefined ? <Text style={noSync}>No existen datos sincronizados hasta el momento</Text>
            : geos.length != 0 && <GeoContainer geos={geos} page={page} setPage={setPage} loading={loading} />}
          {loading && <Loading style={centerLoading} size='large' text='cargando' fontSize={20} />}
        </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noSync: {
    fontSize: 25
  }
})