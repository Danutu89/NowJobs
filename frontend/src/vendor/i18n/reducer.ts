import type { Action } from '../sedux/types/action';
import type { Value } from '../sedux/types/storex';
import { LOAD_LANGUAGES, CHANGE_LANGUAGE } from './constants';

export const i18nReducer = (action: Action, state: Value): Value => {
	switch (action.type) {
		case LOAD_LANGUAGES:
			state.locales = action.locales;
			if (action.locale) state.default = action.locale;
			break;
		case CHANGE_LANGUAGE:
			state.locale = action.locale;
			break;
	}
	return state;
};
