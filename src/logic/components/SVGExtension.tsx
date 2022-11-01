import SVG from './SVG';

type Extension = {
	energy: number,
	energyCapacity: number,
	owner: {
		username: string
	},
	room: {
		controller: {
			level: number
		}
	}
}

/**
 * Returns a html/svg string representation of the given extension object.
 * @author Spedwards
 */
export default class SVGExtension extends SVG {
	/**
	 * @author Spedwards
	 * @param {StructureExtension | string} extension - StructureExtension object or ID string corrosponding to a StructureExtension object.
	 * @param {Number} [size = 50] - SVG size.
	 */
	constructor(private extension: Extension, protected size: number = 50) {
		super();
		// let object = this.validateConstructor(source, SVG.SOURCE);
		// if (object === false) throw new Error('Not a Source object!');
		
		this.string = this.toString();
	}

	render() {
		const SVG_SIZE = this.size;
		
		const BORDER_COLOUR = this.player === this.extension.owner.username ? `#8FBB93` : `#ED5557`;		
		return (
			<svg height={SVG_SIZE} width={SVG_SIZE} viewBox="0 0 100 100">
				<g transform="translate(50,50)">
					<g>
						<>
						<ellipse rx={this.getSize()} ry={this.getSize()} cx="0" cy="0" fill="#181818" stroke={BORDER_COLOUR} stroke-width="5" />
						{
							this.extension.energy > 0 && (() => {
							const ENERGY_RADIUS = 0.7 * this.getSize() * Math.min(this.extension.energy / this.extension.energyCapacity, 1);
								return <ellipse cx="0" cy="0" fill="#FFE56D" rx={ENERGY_RADIUS} ry={ENERGY_RADIUS} />
							})()
						}
						</>
					</g>
				</g>
			</svg>
		);
	}


	/**
	 * @author Spedwards
	 * @returns {Number}
	 */
	 getSize(): number {
		switch(this.extension.room.controller.level) {
			case 8:
				return 50;
			case 7:
				return 40;
			default:
				return 34;
		}
	}
};
