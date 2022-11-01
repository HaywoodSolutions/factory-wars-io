'use strict'
import Room from "./Room";
import { backgroundImage } from "./Room/Constants";

export default class World extends Room {
  blockSize = 10;
	blockAngle = this.blockSize / 2

	constructor(data: string) {
		super(data, {
      w: 500,
      h: 500
    });
	}

	static makeSVG(paths: any[], background: boolean = true, props: any = {}, size: {w: number, h: number}): JSX.Element {
		const content = paths.map(path => {
			const attributes = Object.entries(path).reduce((o, [key, value]) => ({...o, [key]: value}), {})
			return <path {...attributes} />;
		});

		const styleText = {background: `url(${backgroundImage})`, backgroundPosition: 'center', backgroundSize: '33%'};

		return (
			<svg xmlns="http://www.w3.org/2000/svg" width={10 * size.w} height={10 * size.w} style={background ? styleText : {}} viewBox={`0 0 ${20 * size.h} ${20 * size.w}`} shape-rendering="optimizeSpeed" {...props}>{content}</svg>
		);
	}
}