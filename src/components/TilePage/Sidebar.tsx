import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SelectBuildStructure from '../SelectBuildStructure';
import SideBarUser from '../SidebarUser';
import WorldMap from './WorldMap';

const SidebarData = (
  cord: {x: number, y: number},
  structure: {
    selectedStructure: string,
    setStructure: (v: string) => void
  }
): {
  name: string,
  contents: () => JSX.Element
}[] => ([
  {
    name: "User",
    contents: () => {
      return (
        <SideBarUser />
      )
    }
  },
  {
    name: "World Map",
    contents: () => {
      return (
        <WorldMap cord={cord} />
      )
    }
  },
  {
    name: "Build",
    contents: () => {
      return (
        <SelectBuildStructure {...structure} />
      )
    }
  }
]);

export default function SideBar(props: {cord: {x: number, y: number},
  structure: {
    selectedStructure: string,
    setStructure: (v: string) => void
  }
}) {
  return (
    <div>
      {
        SidebarData(props.cord, props.structure).map((v, i) => {
          return (
            <Accordion style={{margin: 0}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${i}-content`}
                id={`${i}-header`}
              >
                <Typography>{v.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {v.contents()}
              </AccordionDetails>
            </Accordion>
          )
        })
      }
    </div>
  );
}