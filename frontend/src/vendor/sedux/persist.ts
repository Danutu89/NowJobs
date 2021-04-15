import { get } from 'svelte/store';
import { mainStore } from './store';
import type { Value } from './types/storex';

export const syncPersist = (name: string, value: Value): void => {
	const { persist } = get(mainStore)[name];

	if (!persist) return;

	let persisted;

	if (typeof persist === 'string') {
		persisted = value[persist];
		persisted = {
			value: persisted,
			_derived: persist
		};
	} else persisted = value;

	localStorage.setItem(name, JSON.stringify(persisted));
};

export const syncMainState = (name: string): void => {
	const store = localStorage.getItem(name);
	if (!store) {
		mainStore.update((prevState) => ({
			...prevState,
			[name]: { ...prevState[name], _persistLoaded: true }
		}));
		return;
	}

	if (typeof get(mainStore)[name].persist === 'string') {
		const json = JSON.parse(localStorage.getItem(name));
		console.log(json);

		get(mainStore)[name].state.update((prevState) => ({
			...prevState,
			[json._derived]: json.value
		}));
	} else {
		get(mainStore)[name].state.update(() => ({
			...JSON.parse(localStorage.getItem(name))
		}));
	}
	mainStore.update((prevState) => ({
		...prevState,
		[name]: { _persistLoaded: true, ...prevState[name] }
	}));
};
