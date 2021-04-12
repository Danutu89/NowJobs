import type { Writable } from 'svelte/store';

export interface Storex extends Writable<Record<string, T>> {
	reset: () => void;
}

export type Value = Record<string, T>;
