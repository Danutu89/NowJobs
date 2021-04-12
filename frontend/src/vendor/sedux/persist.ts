import { get } from 'svelte/store';
import { mainStore } from './store';

export const syncPersist = (name: string): void => {
	const { state, persist } = get(mainStore)[name];

	if (!persist) return;

	let persisted;

	if (typeof persist === 'string') {
		persisted = get(state)[persist];
		persisted = {
			value: persisted,
			_derived: persist
		};
	} else persisted = get(state);

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
		get(mainStore)[name].state.update((prevState) => ({
			...prevState,
			[json._derived]: json.value
		}));
	} else {
		get(mainStore)[name].state.update((prevState) => ({
			...JSON.parse(localStorage.getItem(name))
		}));
	}
	mainStore.update((prevState) => ({
		...prevState,
		[name]: { _persistLoaded: true, ...prevState[name] }
	}));
};
