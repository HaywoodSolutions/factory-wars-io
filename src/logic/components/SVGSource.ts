import SVG from './SVG';

type Source = {
	energy: number,
	energyCapacity: number
}

/**
 * Returns a html/svg string representation of the given source object.
 * @author Spedwards
 */
export default class SVGSource extends SVG {
	/**
	 * @author Spedwards
	 * @param {Source | string} source - Source object or ID string corrosponding to a Source object.
	 * @param {Number} [size = 40] - SVG size.
	 */
	constructor(private source: Source, protected size: number = 40) {
		super();
		// let object = this.validateConstructor(source, SVG.SOURCE);
		// if (object === false) throw new Error('Not a Source object!');

		this.string = this.toString();
	}

	/**
	 * @author Spedwards
	 * @returns {string}
	 */
	toString() {
		if (!this.string) {
			const SVG_SIZE = this.size;

			const SOURCE_HEIGHT = this.source.energy / this.source.energyCapacity * 60;
			const SOURCE_POS = 20 - (SOURCE_HEIGHT / 2);

			return `<svg class="source" height="${SVG_SIZE}" width="${SVG_SIZE}" viewBox="0 0 65 65">` +
				`<g transform="translate(12,12)">` +
					`<rect fill="#111111" height="40" rx="15" ry="15" stroke-width="15" stroke="#595026" width="40">` +
						`<animate attributeName="stroke" dur="4s" repeatCount="indefinite" values="#595026; #0e0c04; #595026" calcMode="linear" />` +
					`</rect>` +
					`<rect fill="#FFE56D" height="${SOURCE_HEIGHT}" width="${SOURCE_HEIGHT}" rx="15" ry="15" x="${SOURCE_POS}" y="${SOURCE_POS}">` +
						`<animate attributeName="fill" dur="2s" repeatCount="indefinite" values="#ffe56d; #fff; #ffcd6d; #ffde84; #ffe56d" calcMode="linear" />` +
					`</rect>` +
				`</g>` +
				`</svg>`;
		}
		return this.string;
	}

	static getSVG(source: Source, size?: number): string {
		return new SVGSource(source, size).toString();
	}
}