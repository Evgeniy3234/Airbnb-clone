import React from 'react';
import './yaMap.css';
import { YMaps, Map, Placemark, Balloon } from '@pbe/react-yandex-maps';
import { useSelector } from 'react-redux';

export const ResultsMap = () => {
  
  const points = useSelector((store) => store.toolkit.points)

  return (
    <YMaps>
        <Map
          className="resultMap"
          defaultState={{
            center: points[0].coordinates.split(', '),
            zoom: 12,
          }}
        >
          {
        points.map((point) => (
          <Placemark
            geometry={point.coordinates.split(', ')}
            properties={{iconContent: point.costPerNight}}
            options={{preset:'islands#blackStretchyIcon'}}
           />
          ))}
        </Map>
    </YMaps>
  );
};
