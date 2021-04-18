import { GET_LOCATIONS, GET_LOCATIONS_FAILED, GOT_LOCATIONS } from '$constants/locations';
import type { GetLocations, GetLocationsFailed, GotLocations } from '$types/locations/actions';
import type { Option } from '$vendor/mase/Select/types/option';

export const getLocations = (name: string, search = ''): GetLocations => {
	return {
		type: GET_LOCATIONS,
		name,
		search
	};
};

export const gotLocations = (results: Array<Option>, name: string): GotLocations => {
	return {
		type: GOT_LOCATIONS,
		name,
		results
	};
};

export const getLocationsFailed = (
	error: { status: number; message: string },
	name: string
): GetLocationsFailed => {
	return {
		type: GET_LOCATIONS_FAILED,
		error,
		name
	};
};
