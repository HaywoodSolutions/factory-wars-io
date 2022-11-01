import * as React from 'react';
import { Link } from 'react-router-dom';
import { SANDBOX_WORLDS } from '../../data/Sandbox';
import { createRoom } from '../../logic/Room/Example';



function WorldMapSection(props: {centerCord: {x: number, y: number}, gridPos: {
  x: number, y: number
}}) {
  const x = props.centerCord.x + props.gridPos.x - 1;
  const y = props.centerCord.y + props.gridPos.y - 1;
  
  const exists: boolean = !!(SANDBOX_WORLDS.mapData[y] && SANDBOX_WORLDS.mapData[y][x]);
  
  return (
    <Link to={`/sim/${x},${y}`}>
      <div style={{position: 'absolute', height: '33.3%', width: '33.3%', backgroundColor: 'black', top: `${props.gridPos.y * 33.3}%`, left: `${props.gridPos.x * 33.3}%`}}>
        {exists && createRoom(SANDBOX_WORLDS.mapData[y][x], {
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
      </div>
    </Link>
  );
}

function WorldMapTile(props: {centerCord: {x: number, y: number}, gridPos: {
  x: number, y: number
}}) {
  const x = props.centerCord.x + props.gridPos.x - 1;
  const y = props.centerCord.y + props.gridPos.y - 1;
  
  const exists: boolean = !!(SANDBOX_WORLDS.mapData[y] && SANDBOX_WORLDS.mapData[y][x]);
  
  return exists ? (
    <Link to={`/sim/${x},${y}`}>
      <WorldMapSection {...props} />
    </Link>
  ) : <WorldMapSection {...props} />;
}

export default function WorldMap(props: {cord: {x: number, y: number}}) {
  return (
    <div style={{position: 'relative', width: '100%', paddingBottom: '100%', backgroundColor: 'black'}}>
      <WorldMapTile centerCord={props.cord} gridPos={{x: 0, y: 0}} />
      <WorldMapTile centerCord={props.cord} gridPos={{x: 1, y: 0}} />
      <WorldMapTile centerCord={props.cord} gridPos={{x: 2, y: 0}} />
      <WorldMapTile centerCord={props.cord} gridPos={{x: 0, y: 1}} />
      <WorldMapTile centerCord={props.cord} gridPos={{x: 1, y: 1}} />
      <WorldMapTile centerCord={props.cord} gridPos={{x: 2, y: 1}} />
      <WorldMapTile centerCord={props.cord} gridPos={{x: 0, y: 2}} />
      <WorldMapTile centerCord={props.cord} gridPos={{x: 1, y: 2}} />
      <WorldMapTile centerCord={props.cord} gridPos={{x: 2, y: 2}} />
    </div>
  );
}