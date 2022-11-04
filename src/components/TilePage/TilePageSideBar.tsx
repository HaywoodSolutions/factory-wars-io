import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SideBar from './Sidebar';
export const drawerWidth = 240;

interface Props {
  window?: () => Window;
  setMobileOpen: (val: boolean) => void;
  mobileOpen: boolean;
  cord: {x: number, y: number},
  structure: {
    selectedStructure: string,
    setStructure: (v: string) => void
  }
}

export default function TilePageSideBar(props: Props) {
  const { window } = props;

  const handleDrawerToggle = () => {
    props.setMobileOpen(!props.mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { xs: drawerWidth }, flexShrink: { xs: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="permanent"
        open={props.mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <SideBar cord={props.cord} structure={props.structure}  />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <SideBar cord={props.cord} structure={props.structure} />
      </Drawer>
    </Box>
  );
}