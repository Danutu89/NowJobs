import { derived } from 'svelte/store';
import { storex } from '../sedux';
import type { Languages } from './types/store';

const initialState = {
	locale: null,
	locales: null,
	default: 'en'
} as Languages;

export const languages = storex(initialState);

const localizedDict = derived([languages], ([$languages]) => {
	if (!$languages.locales) return;
	return $languages.locales[$languages.locale || $languages.default];
});

const getMessageFromLocalizedDict = (id, localizedDict) => {
	const splitId = id.split('.');
	let message = { ...localizedDict };
	splitId.forEach((partialId) => {
		message = message[partialId];
	});
	return message;
};

const createMessageFormatter = (localizedDict) => (id) =>
	getMessageFromLocalizedDict(id, localizedDict);

export const t = derived(localizedDict, ($localizedDict) => {
	return createMessageFormatter($localizedDict);
});
