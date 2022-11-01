'use strict'

import Point from './Point';
import {
	roomSize,
	blockAngle,
	blockSize,
	action,
	backgroundImage,
} from './Constants';

export default class Room {
	private data: string;
	// get blockSize() {
	// 	return 2048 / 20.48 * this.size.w; 
	// }
	// get blockAngle() {
	// 	return this.blockSize / 2;
	// }
	protected blockSize: number = blockSize;
	protected blockAngle = blockAngle

	constructor(data: string, private size: {w: number, h: number} = {w: roomSize, h: roomSize}) {
		this.data = data;
	}

	static makeSVG(paths: any[], background: boolean = true, props: any = {}, size: {w: number, h: number} = {w: roomSize, h: roomSize}): JSX.Element {
		const content = paths.map(path => {
			const attributes = Object.entries(path).reduce((o, [key, value]) => ({...o, [key]: value}), {})
			return <path {...attributes} />;
		});

		const styleText = {background: `url(${backgroundImage})`, backgroundPosition: 'center', backgroundSize: '33%'};

		return (
			<svg xmlns="http://www.w3.org/2000/svg" width={2048 * size.w / 50} height={2048 * size.h / 50} style={background ? styleText : {}} viewBox={`0 0 5000 ${5000 / (size.w / size.h)}`} shape-rendering="optimizeSpeed" {...props}>{content}</svg>
		);
	}

	getCoord(x: number, y: number): Point {
		const val = this.data[this.size.w * y + x]
		return new Point(this, x, y, Number(val))
	}

	drawRectangle(point: Point, draw: number = 1) {
		const { x, y } = point
		const halfBlock = this.blockSize / 2

		let content = []
		let current = point
		let end = point
		let moor = current.getNeighbourhood()

		// Move to rect start
		content.push(`${action.move} ${x * this.blockSize + halfBlock} ${y * this.blockSize}`)

		// Top Left Corner
		if (moor.pLeft.isDrawn(draw) || moor.pLeft.border || moor.pTop.border) {

			// Curve outward
			if (moor.pTopLeft.isDrawn(draw) && !moor.pTop.isDrawn(draw)) {
				content.push(`${action.arc} ${this.blockAngle} ${this.blockAngle} 0 0 1 -${this.blockAngle} -${this.blockAngle}`)
				content.push(`${action.down} ${this.blockSize}`)

				// Sharp
			} else {
				content.push(`${action.right} -${halfBlock}`)
				content.push(`${action.down} ${halfBlock}`)
			}

			// Curve inward
		} else {
			content.push(`${action.arc} ${this.blockAngle} ${this.blockAngle} 0 0 0 -${this.blockAngle} ${this.blockAngle}`)
		}

		// Draw lines down
		while (true) {
			// Break if nothing below
			const { pBottom } = moor
			if (pBottom.border || !pBottom.isDrawn(draw)) {
				break
			}

			content.push(`${action.down} ${halfBlock}`)

			// Left Side
			const { pLeft, pBottomLeft } = moor
			if (!pBottomLeft.isDrawn(draw) && pLeft.isDrawn(draw)) {
				content.push(`${action.right} -${halfBlock}`)
				content.push(`${action.arc} ${this.blockAngle} ${this.blockAngle} 0 0 1 ${this.blockAngle} ${this.blockAngle}`)
			} else {
				content.push(`${action.down} ${halfBlock}`)
			}

			// Continue
			current = pBottom
			moor = current.getNeighbourhood()
		}

		end = current

		// Bottom Left Corner
		if (moor.pLeft.isDrawn(draw) || moor.pLeft.border || moor.pBottom.border) {
			// Sharp
			content.push(`${action.down} ${halfBlock}`)
			content.push(`${action.right} ${halfBlock}`)

			// Curve inward
		} else {
			content.push(`${action.arc} ${this.blockAngle} ${this.blockAngle} 0 0 0 ${this.blockAngle} ${this.blockAngle}`)
		}

		// Bottom Right Corner
		if (moor.pRight.isDrawn(draw) || moor.pRight.border || moor.pBottom.border) {
			// Sharp
			content.push(`${action.right} ${halfBlock}`)
			content.push(`${action.down} -${halfBlock}`)

			// Curve inward
		} else {
			content.push(`${action.arc} ${this.blockAngle} ${this.blockAngle} 0 0 0 ${this.blockAngle} -${this.blockAngle}`)
		}

		// Draw lines back
		while (true) {
			// Break if nothing above
			const { pTop, pMiddle } = moor
			if (pMiddle.y <= y || pTop.border) {
				break
			}

			// Right Side
			const { pRight, pTopRight } = moor
			if (pTop.isDrawn(draw) && pTopRight.isDrawn(draw) && !pRight.isDrawn(draw)) {
				content.push(`${action.arc} ${this.blockAngle} ${this.blockAngle} 0 0 1 ${this.blockAngle} -${this.blockAngle}`)
				content.push(`${action.right} -${halfBlock}`)
			} else {
				content.push(`${action.down} -${halfBlock}`)
			}

			// Continue
			current = pTop
			moor = current.getNeighbourhood()
			content.push(`${action.down} -${halfBlock}`)
		}

		// Top Right Corner
		if (moor.pRight.isDrawn(draw) || moor.pRight.border || moor.pTop.border) {

			// Curve outward
			if (moor.pTopRight.isDrawn(draw) && !moor.pTop.isDrawn(draw)) {
				content.push(`${action.down} -${halfBlock}`)
				content.push(`${action.down} -${halfBlock}`)
				content.push(`${action.arc} ${this.blockAngle} ${this.blockAngle} 0 0 1 -${this.blockAngle} ${this.blockAngle}`)

				// Sharp
			} else {
				content.push(`${action.down} -${halfBlock}`)
				content.push(`${action.right} -${halfBlock}`)
			}

			// Curve inward
		} else {
			content.push(`${action.arc} ${this.blockAngle} ${this.blockAngle} 0 0 0 -${this.blockAngle} -${this.blockAngle}`)
		}

		// Closing action
		content.push(action.close)

		return {
			end,
			content: content.join(' ')
		}
	}

	drawLine(v: number, o: 'down' | 'right') {
		const content = []
		const { x, y } = {
			x: o === 'down' ? v : 0,
			y: o === 'right' ? v : 0,
		}

		// Move to rect start
		content.push(`${action.move} ${x * this.blockSize} ${y * this.blockSize}`)

		// Draw Line
		content.push(`${action[o]} ${this.size.w * this.blockSize}`)

		// Closing action
		content.push(action.close)

		return {
			stroke: '#7a7a7a',
			'stroke-width': 3,
			fill: 'transparent',
			content: content.join(' ')
		}
	}

	build(draw: number | undefined, attributes: Record<string, any> = {}) {
		let content = []

		for (let x = 0; x < this.size.w; x++) {
			for (let y = 0; y < this.size.h; y++) {
				const point = this.getCoord(x, y)

				if (point.isDrawn(draw)) {
					const { end, content: current } = this.drawRectangle(point, draw)
					content.push(current)
					y = end.y
				}
			}
		}

		return {
			...attributes,
			d: content.join(' ')
		}
	}

	buildGrid() {
		let content = []

		for (let x = 0; x <= this.size.w; x++) {
			const { content: current } = this.drawLine(x, 'right')
			content.push(current)
		}

		for (let y = 0; y <= this.size.h; y++) {
			const { content: current } = this.drawLine(y, 'down')
			content.push(current)
		}

		return {
			d: content.join(' ')
		}
	}

	buildSVG(grid: boolean = false, options: {
		background: boolean,
		paths?: {
			name: string,
			cell: number,
			draw: {
				stroke?: string,
				fill?: string,
				"stroke-width"?: number,
				"paint-order"?: string
			}[]
		}[]
	} = {
		background: true,
		paths: []
	}, props: any = {}) {
		const paths = [];

		for (let path of options.paths || []) {
			const builtPath = this.build(path.cell);
			for (let d of path.draw) {
				paths.push({
					...builtPath,
					...d
				});
			}
		}

		return Room.makeSVG(paths, options.background, props, this.size)
	}
}