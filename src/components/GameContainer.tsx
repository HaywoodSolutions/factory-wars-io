import { Box } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';

export type MapObject = {
  x: number,
  y: number,
  object: JSX.Element,
  width: number,
  height: number,
  offset?: {
    x: number,
    y: number
  }
  opacity?: number
};

interface Props {
  type: "map"|"world",
  roomRender: JSX.Element,
  isDrawerOpen: boolean,
  onClick?: (cord: {x: number, y: number}) => void,
  onHover?: (cord?: {x: number, y: number}) => void,
  mapObjects?: MapObject[],
  cord: {x: number, y: number},
  neighbours: {
    top?: boolean,
    right?: boolean
    bottom?: boolean
    left?: boolean
  }
  cursor: {
    value: {
      x: number,
      y: number
    } | null,
    set: (val: {
      x: number,
      y: number
    } | null) => void
  }
}

const getXY = (e: React.MouseEvent, ref: React.RefObject<any>): {
  x: number,
  y: number
} => {
  const x = e.nativeEvent.offsetX;
  const y = e.nativeEvent.offsetY;
  const width = ref.current.getBoundingClientRect().width;
  // const height = ref.current.getBoundingClientRect().height;
  const increments = width / 50;

  return {
    x: Math.floor(x / increments), 
    y: Math.floor(y / increments)
  }
}

export default function GameContainer(props: Props) {
  const inBetween = (min: number, v: number, max: number): boolean => {
    return min <= v && v <= max;
  }

  const curserPos = (pos: {x: number, y: number}): {x: number, y: number, width: number, height: number} => {
    for (let obj of (props.mapObjects || [])) {
      if (inBetween(obj.x, pos.x, obj.x + obj.width) && inBetween(obj.y, pos.y, obj.y + obj.height)) {
        return {
          ...obj
        };
      }
    }
    return {
      ...pos,
      width: 1,
      height: 1
    }
  }

  const {
    onClick,
    onHover
  } = props;

  const onHoverHandler = (cord?: {x: number, y: number}) => {
    props.cursor.set(cord || null);
    onHover && onHover(cord);
  }

  const vCord = props.cursor.value ? curserPos(props.cursor.value) : null;

  const ref = React.createRef<any>();
  return (
    <div style={{width: '100%', height: '100%', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{
        width: "min(100vw - 240px, 100vh)",
        height: "min(100vw - 240px, 100vh)",
        position: "relative",
        background: "black",
        justifyContent: 'center',
        display: 'flex'
        }}
      >
        <div style={{width: '80%', height: '80%', top: '10%', position: 'absolute'}}>
          <div
            ref={ref}
            onClick={onClick ? (e: any) => onClick(getXY(e, ref)) : undefined}
            onMouseMove={(e: any) => onHoverHandler(getXY(e, ref))}
            onMouseLeave={() => onHoverHandler()}
          >
            {props.roomRender}
          </div>
          <div style={{position: 'absolute', left: 0, top: 0, height: '100%', width: "100%", pointerEvents: 'none', display: 'flex', justifyContent: 'center'}}>
            {props.mapObjects?.map((v, i) => {
              return (
                <div style={{position: 'absolute', left: `${(v.x + (v.offset?.x || 0)) * 2}%`, top: `${(v.y + (v.offset?.y || 0)) * 2}%`, height: `${v.height * 2}%`, width: `${v.width * 2}%`, opacity: v.opacity}}>
                  {v.object}
                </div>
              )
            })}
            {vCord && <div style={{position: 'absolute', left: `${vCord.x * 2}%`, top: `${vCord.y * 2}%`, width: `${vCord.width * 2}%`, height: `${vCord.height * 2}%`, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '25%'}} />}
            <div style={{position: 'absolute', minWidth: '100px', minHeight: '50px', bottom: 0, color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: '0px 15px', borderRadius: 20, marginBottom: 15, alignSelf: 'center'}}>
              <p style={{textAlign: 'center'}}>You dont have a spawn<br/>Place one at a safe distance from other spawns</p>
            </div>
          </div>
        </div>
        {props.neighbours.top && <Box component={Link} to={`/sim/${props.cord.x},${props.cord.y-1}`} style={{width: '80%', height: '10%', left: '10%', position: 'absolute', background: 'rgba(20,20,20,0.9)'}}>

        </Box>}
        {props.neighbours.bottom && <Box component={Link} to={`/sim/${props.cord.x},${props.cord.y+1}`} style={{width: '80%', height: '10%', left: '10%', top: '90%', position: 'absolute', background: 'rgba(20,20,20,0.9)'}}>

        </Box>}
        {props.neighbours.left && <Box component={Link} to={`/sim/${props.cord.x-1},${props.cord.y}`} style={{width: '10%', height: '80%', top: '10%', left: '0', position: 'absolute', background: 'rgba(20,20,20,0.9)'}}>

        </Box>}
        {props.neighbours.right && <Box component={Link} to={`/sim/${props.cord.x+1},${props.cord.y}`} style={{width: '10%', height: '80%', top: '10%', left: '90%', position: 'absolute', background: 'rgba(20,20,20,0.9)'}}>

        </Box>}
      </div>
    </div>
  );
}