import * as React from 'react';
import { createRoom } from '../logic/Room/Example';
import RenderTilePage from '../components/TilePage/RenderTilePage';
import { SANDBOX_WORLDS } from '../data/Sandbox';
import { Navigate, useParams } from 'react-router-dom';


export default function ResponsiveDrawer(props: {}) {
  let { cord } = useParams();

  if (!cord) {
    console.log("ERROR")
    return (<Navigate to="/sim/0,0" />);
  }
  const [x, y] = (cord).split(',').map(v => parseInt(v));
  return (
    <RenderTilePage
      {...props}
      room={createRoom(SANDBOX_WORLDS.mapData[y][x], {
        size: {
          w: 50,
          h: 50,
        },
        styles: {
          background: true,
          paths: [
            {
              name: "wall",
              cell: 1,
              draw: [
                {
                  stroke: '#3A506B99',
                  'stroke-width': 50,
                  'paint-order': 'stroke'
                },
              ]
            }
          ]
        },
      })}
      mapObjects={[]}
      cord={{x, y}}
      neighbours={{
        top: !!(SANDBOX_WORLDS.mapData[y - 1] && SANDBOX_WORLDS.mapData[y - 1][x]),
        right: !!(SANDBOX_WORLDS.mapData[y][x + 1]),
        bottom: !!(SANDBOX_WORLDS.mapData[y + 1] && SANDBOX_WORLDS.mapData[y + 1][x]),
        left: !!(SANDBOX_WORLDS.mapData[y][x - 1])
      }}    
    />
  );
}