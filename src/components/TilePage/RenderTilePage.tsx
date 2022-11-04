import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import GameContainer, { MapObject } from '../GameContainer';
import TilePageSideBar from './TilePageSideBar';
import RenderBuilding from './RenderBuilding';

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
  const [selectedStructure, setStructure] = React.useState<string>("");
  const [cursor, setCursor] = React.useState<{x: number, y: number}|null>(null);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      <TilePageSideBar cord={props.cord} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} structure={{selectedStructure, setStructure}} />
      <Box
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', 
        position: "relative", backgroundColor: 'black' }}
      >
        <GameContainer
          isDrawerOpen={mobileOpen}
          type="world"
          roomRender={props.room}
          mapObjects={[
            ...props.mapObjects || [],
            ...(selectedStructure && cursor ? [{
              x: cursor.x,
              y: cursor.y,
              object: RenderBuilding(selectedStructure),
              width: 3,
              height: 3,
              offset: {
                x: -1,
                y: -1
              },
              opacity: 0.5
            } as MapObject] : [])
          ]}
          cursor={{value: selectedStructure ? null : cursor, set: setCursor}}
          cord={props.cord}
          neighbours={props.neighbours}
        />
      </Box>
    </Box>
  );
};
