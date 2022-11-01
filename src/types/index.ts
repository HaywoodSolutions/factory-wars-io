/**
 * This is a Pre-ALPHA phase with temporary structures and data types for initial
 * ideas and get the nitty and gritty logic in place.
 * 
 * Starting with Headquarters and Resources to be the basis of other structures
 * and build a "simulated" equation to represent a complex IN and OUT system.
 * 
 * Once this is established it can be used to scale out to a larger system, to a
 * theoretical scale to infinity...
 */

export enum Resource {
	OXYGEN = "O",
	HYDROGEN = "H",
};

export type ResouceMap<V extends any = number> = {
	[r in Resource]?: V
};

interface Structure {
	id: string,
	in?: Resource[] | "*",
	out?: Resource[] | "*"
};

interface StructureInstance {
	id: string,
	type: string,
	feeds?: string[],
	lastUpdated: number
};

interface StorageStructure extends Structure {
	maxStorage?: ResouceMap,
	storageLimit?: number
};

interface StorageStructureInstance extends StructureInstance {
	storage: ResouceMap
};

export interface ProducerStructure extends StorageStructure {
	extraction?: ResouceMap<{
		amount: number,
		interval: number
	}>,
	produce?: {
		material: ResouceMap,
		interval: number // seconds
	},
	transform?: {
		from: ResouceMap,
		to: ResouceMap,
		interval: number // seconds
	}
};

export interface ProducerStructureInstance extends StorageStructureInstance {
	alpha?: ResouceMap<{
		filledAt: number
	}>
};

export type Headquarters = StorageStructure & {
	id: "HEADQUARTERS",
	in: "*",
	out: "*",
	storage: {
		"*": 100
	},
	maxStorage: 1000
};

export type Extractor<R extends Resource> = ProducerStructure & {
	id: "HEADQUARTERS",
	out: [R],
	storage: {
		[v in R]: number
	},
	produce: {
		material: {
			[v in R]: 1
		}
	}
};

export interface Drone {
	id: string,
	mode: "transport",
	structureA: string,
	structureB: string
};

export type UserFactory = {
	drones: Record<string, Drone>
	structures: Record<string, Structure>
};
