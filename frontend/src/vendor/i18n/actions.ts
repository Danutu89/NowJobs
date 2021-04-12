import type { Action } from '../sedux/types/action';
import { LOAD_LANGUAGES, CHANGE_LANGUAGE } from './constants';

export const loadLanguages = (locales: [], locale = null, name: string): Action => {
	return {
		type: LOAD_LANGUAGES,
		locale,
		locales,
		name
	};
};

export const changeLanguage = (locale: string, name: string): Action => {
	return {
		type: CHANGE_LANGUAGE,
		locale,
		name
	};
};
