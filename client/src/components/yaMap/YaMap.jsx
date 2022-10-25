import React from 'react'
import "./yaMap.css"
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

export const YaMap = ({x,y}) => {

  return (
    <YMaps >
    <Map className='yaMap' defaultState={{
    center: [x, y],
    zoom: 12
  }}>
      <Placemark defaultGeometry={[x, y]} />
    </Map>
  </YMaps>
  )
}
