import * as React from 'react';
import { WorldMapTile } from './WorldTile';

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
};