import Room from './Room';
import roomData from './examples/rooms.terrain';
import { draw } from './Constants';
import { genMap } from '../../mapgen/genMap';
import { genWorldMap } from '../../mapgen/worldMap';
import { getCountryByCode } from '../../mapgen/Countries';
import Projection from '../../mapgen/Projection';

export default (roomData as { terrain: string }[]).map(room =>
	new Room(room.terrain).buildSVG(
		false, // Grid overlay
		{
			background: true,
			paths: [
				{
					name: "swamp",
					cell: draw.swamp,
					draw: [
						{
							stroke: '#4a501e99',
							fill: '#4a501eff',
							'stroke-width': 50,
							'paint-order': 'stroke'
						},
						{
							fill: '#ffffff11',
						}
					]
				},
				{
					name: "wall",
					cell: draw.wall,
					draw: [
						{
							stroke: '#00000022',
							'stroke-width': 60,
						},
						{
							stroke: '#000',
							'stroke-width': 20,
						},
						{
							fill: '#444',
						}
					]
				}
			]
		},
		{
			left:0, top:0, width:"100%", height:"100%", position:"absolute"
		}
	)
)

export const createRoom = (obj: string, options?: {
	styles?: any, size?: {w: number, h: number}}) => {
	return new Room(obj, options?.size).buildSVG(false, options?.styles || {
		background: true,
		paths: [
			{
				name: "wall",
				cell: 0,
				draw: [
					{
						stroke: '#3A506B99',
						fill: '#1C2541ff',
						'stroke-width': 50,
						'paint-order': 'stroke'
					},
					{
						fill: '#00000033',
					}
				]
			}
		]
	}, {
		left:0, top:0, width:"100%", height:"100%", position:"absolute"
	});
}


export const CustomRoom = createRoom(genMap(50, {
	lat: 51.833335663,
	lng: 0.69692012700006
}).join(''));

export const WorldTile = createRoom(genWorldMap().join(''), {
	styles: {
		background: true,
		paths: [
			{
				name: "wall",
				cell: 0,
				draw: [
					{
						stroke: '#3A506B99',
						fill: '#1C2541ff',
						'stroke-width': 10,
						'paint-order': 'stroke'
					},
					{
						fill: '#00000033',
					}
				]
			}
		]
	}
});