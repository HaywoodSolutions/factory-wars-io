import _ from 'lodash';
import SVG from './SVG';

/**
 * Returns a html/svg string representation of the given container object.
 * @author Spedwards
 */
export default class SVGHeadquarters extends SVG {
	constructor(container: {} = {}, protected size: number|string = "100%") {
		super();
	}

	render() {
		const SVG_SIZE = this.size;
		
		// const CONTAINER = this.object;
		// const CAPACITY = CONTAINER.storeCapacity;
		// const ENERGY = CONTAINER.store["RESOURCE_ENERGY"];
		// const POWER = CONTAINER.store["RESOURCE_POWER"] || 0;
		// const TOTAL = _.sum(Object.values(CONTAINER.store));
		
		// const HEIGHT = 50;
		// const START_Y = 25;
		
		// const ENERGY_HEIGHT = ENERGY * HEIGHT / CAPACITY;
		// const OTHER_HEIGHT = TOTAL * HEIGHT / CAPACITY;
		// const POWER_HEIGHT = (POWER + ENERGY) * HEIGHT / CAPACITY;
		
		// const ENERGY_Y = START_Y - ENERGY_HEIGHT;
		// const OTHER_Y = START_Y - OTHER_HEIGHT;
		// const POWER_Y = START_Y - POWER_HEIGHT;
		
		return  (
			<svg height={SVG_SIZE} width={SVG_SIZE} viewBox="0 0 80 80">
				<g transform="translate(5,5)">
					<rect fill="#555555" height="70" width="70" stroke-width="5" stroke="#181818" rx="15" ry="15" />
					<rect fill="#555555" height="26" width="26" x="22" y="22" stroke-width="4" stroke="#181818" rx="7.5" ry="7.5" />
					
					<circle cx="22.5" cy="11.25" r="2.5" fill="#713D40">
						<animate attributeName="fill" dur="6s" repeatCount="indefinite" values="#713D40; #E70E20; #713D40" calcMode="linear" begin="0s" />
					</circle>
					<circle cx="35" cy="11.25" r="2.5" fill="#713D40">
						<animate attributeName="fill" dur="6s" repeatCount="indefinite" values="#713D40; #E70E20; #713D40" calcMode="linear" begin="1s" />
					</circle>
					<circle cx="47.5" cy="11.25" r="2.5" fill="#713D40">
						<animate attributeName="fill" dur="6s" repeatCount="indefinite" values="#713D40; #E70E20; #713D40" calcMode="linear" begin="2s" />
					</circle>

					<circle cx="58.75" cy="22.5" r="2.5" fill="#713D40">
						<animate attributeName="fill" dur="6s" repeatCount="indefinite" values="#713D40; #E70E20; #713D40" calcMode="linear" begin="3s" />
					</circle>
					<circle cx="58.75" cy="35" r="2.5" fill="#713D40">
						<animate attributeName="fill" dur="6s" repeatCount="indefinite" values="#713D40; #E70E20; #713D40" calcMode="linear" begin="4s" />
					</circle>
					<circle cx="58.75" cy="47.5" r="2.5" fill="#713D40">
						<animate attributeName="fill" dur="6s" repeatCount="indefinite" values="#713D40; #E70E20; #713D40" calcMode="linear" begin="5s" />
					</circle>

					<circle cx="47.5" cy="58.75" r="2.5" fill="#713D40">
						<animate attributeName="fill" dur="6s" repeatCount="indefinite" values="#713D40; #E70E20; #713D40" calcMode="linear" begin="0s" />
					</circle>
					<circle cx="35" cy="58.75" r="2.5" fill="#713D40">
						<animate attributeName="fill" dur="6s" repeatCount="indefinite" values="#713D40; #E70E20; #713D40" calcMode="linear" begin="1s" />
					</circle>
					<circle cx="22.5" cy="58.75" r="2.5" fill="#713D40">
						<animate attributeName="fill" dur="6s" repeatCount="indefinite" values="#713D40; #E70E20; #713D40" calcMode="linear" begin="2s" />
					</circle>

					<circle cx="11.25" cy="47.5" r="2.5" fill="#713D40">
						<animate attributeName="fill" dur="6s" repeatCount="indefinite" values="#713D40; #E70E20; #713D40" calcMode="linear" begin="3s" />
					</circle>
					<circle cx="11.25" cy="35" r="2.5" fill="#713D40">
						<animate attributeName="fill" dur="6s" repeatCount="indefinite" values="#713D40; #E70E20; #713D40" calcMode="linear" begin="4s" />
					</circle>
					<circle cx="11.25" cy="22.5" r="2.5" fill="#713D40">
						<animate attributeName="fill" dur="6s" repeatCount="indefinite" values="#713D40; #E70E20; #713D40" calcMode="linear" begin="5s" />
					</circle>
				</g>
			</svg>
		);
	}
}
