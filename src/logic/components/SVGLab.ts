import SVG from './SVG';
import _ from 'lodash';

type Lab = {
	owner: {
		username: string
	},
	mineralType: string,
	mineralAmount: number,
	mineralCapacity: number,
	energy: number,
	energyCapacity: number
};

/**
 * Returns a html/svg string representation of the given lab object.
 * @author Enrico
 * @author Spedwards
 */
export default class SVGLab extends SVG {
	private coloured: boolean;

	/**
	 * @author Spedwards
	 * @param {StructureLab | string} lab - StructureLab object or ID string corrosponding to StructureLab object.
	 * @param {Boolean} [coloured = true] - Colour the mineral in lab.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(private lab: Lab, coloured = true, protected size: number = 50) {
		super();
		// let object = this.validateConstructor(source, SVG.SOURCE);
		// if (object === false) throw new Error('Not a Source object!');
		
		this.coloured = typeof coloured === 'boolean' ? coloured : true;
		this.string = this.toString();
	}

	/**
	 * @author Enrico
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;
			
			const BORDER_COLOUR = this.player === this.lab.owner.username ? `#8FBB93` : `#ED5557`;

			let outStr = `<svg viewBox="0 0 120 120" height="${SVG_SIZE}" width="${SVG_SIZE}">` +
				`<g transform="translate(60,55)">` +
				`<path d="M 50 40 A 60 60 0 1 0 -50 40 V 63 H 50 Z" fill="#181818" stroke="${BORDER_COLOUR}" stroke-width="5"/>` +
				`<path d="M 36 33 A 46 43 0 1 0 -36 33 Z" fill="#555"/>`;

			if (this.lab.mineralType) {
				let MINERAL_COLOUR = '#FFFFFF';

				if (this.coloured && this.lab.mineralType.indexOf('G') === -1) {
					if (['H', 'O'].includes(this.lab.mineralType)) {
						MINERAL_COLOUR = '#989898';
					} else if (['UL', 'ZK', 'OH'].includes(this.lab.mineralType)) {
						MINERAL_COLOUR = '#B4B4B4';
					} else {
						const BASE_COLOURS: Record<string, string> = {
							["RESOURCE_UTRIUM"]: '#48C5E5',
							["RESOURCE_LEMERGIUM"]: '#24D490',
							["RESOURCE_KEANIUM"]: '#9269EC',
							["RESOURCE_ZYNTHIUM"]: '#D9B478',
						};
						let containedMineral = _(Object.keys(BASE_COLOURS)).find(c => this.lab.mineralType.indexOf(c) !== -1);
						if (containedMineral) {
							MINERAL_COLOUR = BASE_COLOURS[containedMineral];
						}
					}
				}

				const MINERAL_TRANSFORM = this.lab.mineralAmount / this.lab.mineralCapacity;
				outStr += `<path d="M 36 33 A 46 43 0 1 0 -36 33 Z" fill="${MINERAL_COLOUR}" transform="matrix(${MINERAL_TRANSFORM},0,0,${MINERAL_TRANSFORM},0,${33*(1-MINERAL_TRANSFORM)})"/>`;
			}

			if (this.lab.energy) {
				const ENERGY_WIDTH = 72 * (this.lab.energy / this.lab.energyCapacity);
				const ENERGY_X = -36 * (this.lab.energy / this.lab.energyCapacity);
				outStr += `<rect fill="#ffe56d" height="10" y="43" width="${ENERGY_WIDTH}" x="${ENERGY_X}"/>`;
			}

			outStr += `</g></svg>`;
			return outStr;
		}
		return this.string;
	}

	static getSVG(lab: Lab, coloured = true, size?: number): string {
		return new SVGLab(lab, coloured, size).toString();
	}
};