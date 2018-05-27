// @flow

import * as React from 'react';
import './App.css';

import Nav from './components/Nav/Nav';
import Splash from './components/Splash/Splash';

import type { TotalItem, TickerItem, GenreItem } from './types';

import totalsData from './data/totals_archive.json';
import tickerData from './data/ticker_archive.json';

type Props = {};

type State = {
  // data
  tickerData: Array<TickerItem>,
  totalsData: Array<TotalItem>,
  totalsDays: number,

  //genre chart stuff
  activeGenres: ?Array<string>,

  genreList: Array<GenreItem>
};

class App extends React.Component<Props, State> {
  state = {
    activeGenres: [],
    totalsData: totalsData,
    tickerData: tickerData,
    totalsDays: 30,
    genreList: [
      { name: 'Doom Metal', active: false },
      { name: 'Noise', active: false },
      { name: 'EBM', active: false },
      { name: 'Happy Hardcore', active: false },
      { name: 'Prog Rock', active: false },
      { name: 'Black Metal', active: false },
      { name: 'Trance', active: false },
      { name: 'Dub', active: false },
      { name: 'Boogie', active: true },
      { name: 'Death Metal', active: false },
      { name: 'Acid Jazz', active: false },
      { name: 'New Age', active: false },
      { name: 'Free Jazz', active: false },
      { name: 'Techno', active: false },
      { name: 'Deep House', active: false },
      { name: 'Tech House', active: false },
      { name: 'Ambient', active: false },
      { name: 'Italo-Disco', active: false },
      { name: 'Freestyle', active: false },
      { name: 'Drum n Bass', active: false }
    ]
  };

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Nav />
        <Splash />
      </div>
    );
  }
}

export default App;
