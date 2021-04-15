import type { Writable } from 'svelte/store';

export interface Action {
	name: string;
	type: symbol;
	[prop: string]: any;
}

export type ActionVoid = () => Action;

export interface Slicer {
	reset: void;
	subscribe: Writable<T>['subscribe'];
	destroy: () => void;
}
