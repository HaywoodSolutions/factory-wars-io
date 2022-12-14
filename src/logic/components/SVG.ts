/**
 * Parent to all SVG classes.
 * Contains methods available to all SVG classes.
 * @author Spedwards
 */

export default class SVG {
	protected size: number|string = 40;
	protected string: string = "";
	protected player = "";

	static get CREEP(): string {
		return 'creep';
	}

	static get ROOM(): string {
		return 'room';
	}

	static get SOURCE(): string {
		return 'source';
	}

	static get MINERAL(): string {
		return 'mineral';
	}

	// get player(): string {
	// 	return _(Game.rooms).filter(r => r.controller.my).min(r => r.controller.level).controller.owner.username;
	// }

	// /**
	//  * Validate the parameter type is correct.
	//  * @param {*} object - The object to check against.
	//  * @param {string} expectedType - SVG.CREEP, SVG.ROOM, SVG.SOURCE, or on of the STRUCTURE_* constants.
	//  * @returns {Boolean | Room | RoomObject} False if not expected type, else the RoomObject or Room.
	//  */
	// validateConstructor(object, expectedType: string) {
	// 	if (expectedType === SVG.ROOM) {
	// 		let room = object;
	// 		if (typeof object === 'string') {
	// 			room = Game.rooms[object];
	// 		}

	// 		if (room instanceof Room) {
	// 			return room;
	// 		}
	// 		return false;
	// 	} else if (expectedType === SVG.CREEP) {
	// 		let creep = object;
	// 		if (typeof object === 'string') {
	// 			creep = Game.creeps[object];
	// 		}

	// 		if (!(creep instanceof Creep)) {
	// 			creep = this.id(object);
	// 		}

	// 		if (creep instanceof Creep) {
	// 			return creep;
	// 		}
	// 		return false;
	// 	} else if (expectedType === SVG.SOURCE) {
	// 		let source = object;
	// 		if (typeof object === 'string') {
	// 			source = this.id(object);
	// 		}

	// 		if (source instanceof Source) {
	// 			return source;
	// 		}
	// 		return false;
	// 	} else if (expectedType === SVG.MINERAL) {
	// 		let mineral = object;
	// 		if (typeof object === 'string') {
	// 			mineral = this.id(object);
	// 		}

	// 		if (mineral instanceof Mineral) {
	// 			return mineral.mineralType;
	// 		}

	// 		if (_.includes(['H', 'O', 'U', 'L', 'K', 'Z', 'X'], object)) {
	// 			return object;
	// 		}
	// 		return false;
	// 	} else {
	// 		let structure = object;
	// 		if (typeof object === 'string') {
	// 			structure = this.id(object);
	// 		}

	// 		if (!(structure instanceof Structure)) return false;

	// 		if (structure.structureType === expectedType) {
	// 			return structure;
	// 		}
	// 		return false;
	// 	}
	// }

	// id(id: string) {
	// 	return Game.getObjectById(id);
	// }
}
