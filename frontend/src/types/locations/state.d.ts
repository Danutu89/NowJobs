import type { Option } from '$vendor/mase/Select/types/option';

export interface Location {
	name: string;
	id: string;
}

export interface State {
	locations: {
		results: Array<Option>;
		error: {
			status: number;
			message: string;
		};
		loading: boolean;
	};
}
