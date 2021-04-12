export interface Action {
	name: string;
	type: symbol;
	[x: string]: T;
}

export type ActionVoid = () => Action;
