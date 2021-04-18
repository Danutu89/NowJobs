import type { Option } from '$vendor/mase/Select/types/option';

export interface Category {
	name: string;
	id: string;
}

export interface State {
	categories: {
		results: Array<Option>;
		error: {
			status: number;
			message: string;
		};
		loading: boolean;
	};
}
