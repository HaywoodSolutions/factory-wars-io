import SVG from './SVG';

export type Resource = "RESOURCE_ENERGY" | "RESOURCE_POWER" | "RESOURCE_HYDROGEN" | "RESOURCE_OXYGEN" | "RESOURCE_UTRIUM" | "RESOURCE_LEMERGIUM" | "RESOURCE_KEANIUM" | "RESOURCE_ZYNTHIUM" | "RESOURCE_CATALYST"

/**
 * Takes a resource type constant as input and
 * returns the html/svg string for the icon of
 * that resource upon calling `.toString()`
 * @author Helam
 * @author Spedwards
 */
export default class SVGResource extends SVG {
	private resourceType: Resource;
	private amount: number;

/**
	 * @author Spedwards
	 * @param {string} resourceType
	 * @param {Number | Boolean} [amount = 0] - 0 by default, pass false to hide it
	 */
	constructor(resourceType: Resource, amount: number = 0) {
		super();
		if (typeof resourceType !== 'string') throw new Error('Resource is not a String!');
		if (!Number.isInteger(amount)) throw new Error('Amount is not an Integer!');

		this.resourceType = resourceType;
		this.amount = amount;
		this.string = this.toString();
	}

	/**
	 * @author Helam
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			let length = Math.max(1, Math.ceil(Math.log10(this.amount + 1)));
			let amountWidth = length * 10 + 5;

			if (this.amount === 0) {
				amountWidth = 0;
			}

			let textDisplacement = 14;
			let finalWidth = 14 + amountWidth;

			let outStr = `<svg width="!!" height="14">`;

			if (this.resourceType === "RESOURCE_ENERGY") {
				outStr += `<circle cx="7" cy="7" r="5" style="fill:#FEE476"/>`;
			} else if (this.resourceType === "RESOURCE_POWER") {
				outStr += `<circle cx="7" cy="7" r="5" style="fill:#F1243A"/>`;
			} else {
				const BASE_MINERALS: { [id: string]: { back: string, front: string } } = {
					["null"]: { back: `#fff`, front: `#000` },
					["RESOURCE_HYDROGEN"]: { back: `#4D4D4D`, front: `#CCCCCC` },
					["RESOURCE_OXYGEN"]: { back: `#4D4D4D`, front: `#CCCCCC` },
					["RESOURCE_UTRIUM"]: { back: `#1B617F`, front: `#88D6F7` },
					["RESOURCE_LEMERGIUM"]: { back: `#3F6147`, front: `#89F4A5` },
					["RESOURCE_KEANIUM"]: { back: `#331A80`, front: `#9370FF` },
					["RESOURCE_ZYNTHIUM"]: { back: `#594D33`, front: `#F2D28B` },
					["RESOURCE_CATALYST"]: { back: `#4F2626`, front: `#FF7A7A` },
				};

				const COMPOUNDS: { [id: string]: { back: string, front: string } } = {
					["RESOURCE_UTRIUM"]: { back: `#58D7F7`, front: `#157694` },
					["RESOURCE_LEMERGIUM"]: { back: `#29F4A5`, front: `#22815A` },
					["RESOURCE_KEANIUM"]: { back: `#9F76FC`, front: `#482794` },
					["RESOURCE_ZYNTHIUM"]: { back: `#FCD28D`, front: `#7F6944` },
					["RESOURCE_GHODIUM"]: { back: `#FFFFFF`, front: `#767676` },
					["RESOURCE_OXYGEN"]: { back: `#99ccff`, front: `#000066` },
					["RESOURCE_HYDROGEN"]: { back: `#99ccff`, front: `#000066` },
				};

				let colours = BASE_MINERALS[this.resourceType];

				if (colours) {
					outStr += `<circle cx="7" cy="7" r="5" style="stroke-width:1;stroke:${colours.front};fill:${colours.back}"/>` +
						`<text x="7" y="8" font-family="Verdana" font-size="8" alignment-baseline="middle" text-anchor="middle" style="fill:${colours.front};font-weight:bold;">${this.resourceType === undefined ? '?' : this.resourceType}</text>`;
				} else {
					let compoundType = ["RESOURCE_UTRIUM", "RESOURCE_LEMERGIUM", "RESOURCE_KEANIUM", "RESOURCE_ZYNTHIUM", "RESOURCE_GHODIUM", "RESOURCE_HYDROGEN", "RESOURCE_OXYGEN"].find(type => this.resourceType.indexOf(type) !== -1);
					let colours = COMPOUNDS[compoundType || "null"];
					if (colours) {
						let width = this.resourceType.length * 9;
						finalWidth += width;
						textDisplacement += width;
						outStr += `<rect x="0" y="0" width="${width}" height="14" style="fill:${colours.back}"/>` +
							`<text x="${width / 2.0}" y="8" font-family="Verdana" font-size="8" alignment-baseline="middle" text-anchor="middle" style="fill:${colours.front};font-weight:bold;">${this.resourceType}</text>`;
					} else {
						throw new Error(`Invalid resource type ${this.resourceType} in SVGResource!`);
					}
				}
			}

			if (this.amount !== 0) {
				outStr += `<text font-family="Verdana" font-size="10" x="${textDisplacement + amountWidth / 2}" y="8" alignment-baseline="middle" text-anchor="middle" style="fill:white"> x ${this.amount.toLocaleString()}</text>`;
			}
			outStr += `</svg>`;

			outStr = outStr.split('!!').join(finalWidth.toString());

			return outStr;
		}
		return this.string;
	}

	static getSVG(resourceType: Resource, amount?: number): string {
		return new SVGResource(resourceType, amount).toString();
	}
}