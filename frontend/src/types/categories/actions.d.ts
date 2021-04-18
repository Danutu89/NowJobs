import type { Option } from '$vendor/mase/Select/types/option';
import type { Action } from '$vendor/sedux/types/action';

export interface GetCategories extends Action {
	search?: string;
	domain?: string;
}

export interface GotCategories extends Action {
	results: Array<Option>;
}

export interface GetCategoriesFailed extends Action {
	error: {
		status: number;
		message: string;
	};
}
