/**
 * @format
 */

import 'react-native';
import React, {useState} from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { DetailGeo } from '../src/screens/DetailGeo';
import { Main } from '../src/screens/Main';
import { Loading } from '../src/components/loading';
import { API_COUNTRY, API_PAGE, API_PATH, DEFAULT_IMAGE } from '../src/util/constants';
import store from "../src/redux/reducer";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { getService } from '../src/util/httpUtil';
import { Database } from '../src/db';
import MockedNavigator from './MockedNavigator'

const geoTest = () => {
  const image = []
  image.push({'#text': DEFAULT_IMAGE})
  image.push({'#text': DEFAULT_IMAGE})
  image.push({'#text': DEFAULT_IMAGE})
  image.push({'#text': DEFAULT_IMAGE})
  const artist = {name: 'Radiohead', url: 'https://es.wikipedia.org/wiki/Radiohead'}
  const url = 'https://es.wikipedia.org/wiki/Creep_(canci%C3%B3n_de_Radiohead)'
  const track = {wiki: {published: '10/10/20', summary:'N/A' }, url: 'https://es.wikipedia.org/wiki/Radiohead', album: {url: 'https://es.wikipedia.org/wiki/Pablo_Honey'}}
  return { name: 'Creep', duration: 700, image, artist, track, url }
}

/** Test de librerías */
jest.mock('react-native-reanimated', () => {
  const View = require('react-native').View;
  return {
    Value: jest.fn(),
    event: jest.fn(),
    add: jest.fn(),
    eq: jest.fn(),
    set: jest.fn(),
    cond: jest.fn(),
    interpolate: jest.fn(),
    View: View,
    Extrapolate: { CLAMP: jest.fn() },
    Transition: {
      Together: 'Together',
      Out: 'Out',
      In: 'In',
    },
  };
});
/** Test de navegaión */
jest.mock('react-navigation-hooks', () => ({
  useNavigation: () => jest.fn(),
  useNavigationParam: jest.fn(jest.requireActual(
   'react-navigation-hooks'
  ).useNavigationParam),
 }));

 /** Test de renderizado */
it('renders correctly App', () => {
  renderer.create(<App />);
});
it('renders correctly Loading', () => {
  renderer.create(<Loading />);
});
/** Test de redux */
it('renders correctly Main', () => {
  renderer.create(
    <Provider store={store}>
      <Main />
    </Provider>);
});

/** Test de renderizado con navegación y redux */
it('renders correctly DetailGeo', () => {
  const defaultStore = {oneGeo: geoTest()}
  const newStore = createStore((state = defaultStore) => state)
  renderer.create(
    <Provider store={newStore}>
      <MockedNavigator name="geo" component={Main}/>
      <MockedNavigator name="detail" component={DetailGeo} component={Main}/>
    </Provider>);
});

/** Test de llamado a servicios */
test('should return api', async () => {
  getService(`${API_PATH}${API_COUNTRY}spain${API_PAGE}1`).then(response => {
    expect(response).not.toBe(null)
    expect(response).not.toBe(undefined)
  })
})
/** Test de conexión a base de datos */
test('should exists database', () => {
  new Database().instance().then((databaseInstance) => {
    expect(databaseInstance).toBeTruthy()
  })
})