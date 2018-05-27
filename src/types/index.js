// types

// @flow

export type TotalItem = {
  totalPrice: number,
  date: Date
};

export type TickerItem = {};

export type ReleaseItem = {
  title: string,
  url: string,
  rank: number,
  cat_number: string,
  median_price: string,
  total_wants: number,
  artist: string,
  _id: string
};

export type DailyItem = {
  date: Date,
  name: string,
  currentDayPrice: string,
  topReleases: Array<ReleaseItem>,
  previousDayPrice: string,
  diffPercent: number,
  diffAmount: number,
  movement: string,
  best: boolean,
  worst: boolean
};

export type GenreItem = {
  name: string,
  active: boolean
};
