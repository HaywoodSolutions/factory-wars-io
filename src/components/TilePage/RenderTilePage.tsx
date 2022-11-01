import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import GameContainer, { MapObject } from '../GameContainer';
import TilePageSideBar from './TilePageSideBar';

interface Props {
  room: JSX.Element,
  mapObjects?: MapObject[],
  cord: {x: number, y: number},
  neighbours: {
    top?: boolean,
    right?: boolean
    bottom?: boolean
    left?: boolean
  }
}

export default function RenderTilePage(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      <TilePageSideBar cord={props.cord} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Box
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', 
        position: "relative", backgroundColor: 'black' }}
      >
        <GameContainer
          isDrawerOpen={mobileOpen}
          type="world"
          roomRender={props.room}
          mapObjects={props.mapObjects}
          cord={props.cord}
          neighbours={props.neighbours}
        />
      </Box>
    </Box>
  );
}