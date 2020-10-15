import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { GeoContainer } from "../containers/GeoContainer";
import { useSelector, useDispatch } from "react-redux";
import { getService } from '../util/httpUtil';
import { API_COUNTRY, API_PAGE, API_PATH } from '../util/constants';
import { Loading } from '../components/loading';

export const Main = () => {
  const actualPage = useSelector(state => state.actualPage)
  const dispatch = useDispatch()
  const { container, basicText, centerLoading } = styles
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [geos, setGeos] = useState([])
  const [country, setCountry] = useState('spain')

  useEffect(() => {
    callApi()
  }, [page])
  
  const callApi = async () =>{ 
    setLoading(true)
    await getService(`${API_PATH}${API_COUNTRY}${country}${API_PAGE}${page}`).then(response => {
      setGeos(response)
      setLoading(false)
    })
  }

  return (
    <View style={container}>
      {
        loading ? <>
          <Loading style={centerLoading} size='large' text='cargando' fontSize={20} />
        </> :
        geos.length != 0 ? <GeoContainer geos={geos} /> : <Text style={basicText}>No hay registro de Geos actualmente</Text>
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
  basicText: {
    fontSize: 20
  },
  centerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})