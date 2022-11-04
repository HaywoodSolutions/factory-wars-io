import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ButtonBase } from '@mui/material';

import SVGExtension from '../logic/components/SVGExtension';
import SVGHeadquarters from '../logic/components/SVGHeadquarters';

function BasicCard(props: {title: string, description: string, svg?: JSX.Element, active: boolean, onClick?: () => void, disabled?: boolean}) {
  return (
    <ButtonBase onClick={() => {
      !props.disabled && props.onClick && props.onClick()
    }} style={{width: "100%"}} disabled={props.disabled}>
      <Card elevation={0} style={{backgroundColor: props.active ? 'rgba(0,0,0,0.1)' : ''}}>
        <CardContent>
          <div style={{display: 'flex', alignItems: 'flex-start'}}>
            <div style={{marginRight: 3}}>
              {props.svg}
            </div>
            <div>
              <Typography variant="h6" component="div" style={{fontSize: 14, marginTop: 1}}>
                {props.title}
              </Typography>
            </div>
          </div>
            <Typography variant="body2" style={{fontSize: 11, textAlign: 'left'}}>
              {props.description}
            </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}

export default function SelectBuildStructure(props: {
  selectedStructure: string,
  setStructure: (v: string) => void
}) {
  const { selectedStructure, setStructure } = props;

  return (
    <div>
      <BasicCard
        title="Headquaters"
        description='Spawns creeps using energy contained in the room spawns and extensions.'
        svg={new SVGHeadquarters({}, 25).render()}
        active={selectedStructure == "HEADQUARTERS"}
        onClick={() => setStructure("HEADQUARTERS")}
      />
      <BasicCard
        title="Extension"
        description='Contains additional energy which can be used by spawns for spawning bigger creeps.'
        svg={new SVGExtension({
          energy: 100,
          energyCapacity: 100,
          owner: {
            username: "string"
          },
          room: {
            controller: {
              level: 5
            }
          }
        }, 25).render()}
        active={selectedStructure == "EXTENSION"}
        onClick={() => setStructure("EXTENSION")}
        disabled
      />
      <BasicCard
        title="Road"
        description='Decreases movement cost. Decays over time and requires repair.'
        svg={new SVGExtension({
          energy: 100,
          energyCapacity: 100,
          owner: {
            username: "string"
          },
          room: {
            controller: {
              level: 5
            }
          }
        }, 25).render()}
        active={selectedStructure == "ROAD"}
        onClick={() => setStructure("ROAD")}
      />
      <BasicCard
        title="Container"
        description='Stores up to 2,000 resource units. Decays over time and requires repair.'
        svg={new SVGExtension({
          energy: 100,
          energyCapacity: 100,
          owner: {
            username: "string"
          },
          room: {
            controller: {
              level: 5
            }
          }
        }, 25).render()}
        active={selectedStructure == "CONTAINER"}
        onClick={() => setStructure("CONTAINER")}
      />
      <BasicCard
        title="Storage"
        description='Stores up to 1,000,000 resource units.'
        svg={new SVGExtension({
          energy: 100,
          energyCapacity: 100,
          owner: {
            username: "string"
          },
          room: {
            controller: {
              level: 5
            }
          }
        }, 25).render()}
        active={selectedStructure == "STORAGE"}
        onClick={() => setStructure("STORAGE")}
      />
      <BasicCard
        title="Extractor"
        description='Allows to mine a mineral deposit.'
        svg={new SVGExtension({
          energy: 100,
          energyCapacity: 100,
          owner: {
            username: "string"
          },
          room: {
            controller: {
              level: 5
            }
          }
        }, 25).render()}
        active={selectedStructure == "EXTRACTOR"}
        onClick={() => setStructure("EXTRACTOR")}
      />
    </div>
  );
}