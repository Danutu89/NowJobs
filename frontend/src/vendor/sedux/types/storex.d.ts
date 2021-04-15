import type { Writable } from 'svelte/store';

export interface Storex<T> extends Writable<T> {
	reset: () => void;
}

export type Value = T;

export declare function storex<T>(initialState: T): Storex<T>;
