import { dispatch } from '$vendor/sedux';
import { request } from '$utils/request';
import type { Value } from '$vendor/sedux/types/storex';
import type { Response } from '$types/response';
import { GET_LOCATIONS } from '$constants/locations';
import type { GetLocations } from '$types/locations/actions';
import { getLocationsFailed, gotLocations } from '$actions/locations';
import type { Option } from '$vendor/mase/Select/types/option';
import type { Location } from '$types/locations';

const getLocations = async ({ search, name }: GetLocations): Promise<void> => {
	try {
		const res = await request.get('/api/locations', { search });
		const json: Response<Array<Location>> = await res.json();
		if (res.status !== 200) {
			let error = '';

			if (json.non_field_errors) {
				error = json.non_field_errors[0];
			} else if (json.details) {
				error = json.details;
			} else {
				const key = Object.keys(json)[0];
				error = json[key][0];
			}

			return dispatch(() => getLocationsFailed({ status: res.status, message: error }, name));
		}
		const parsed: Array<Option> = json.map((company) => ({
			value: company.id,
			text: company.name
		}));
		return dispatch(() => gotLocations(parsed, name));
	} catch (error) {
		return dispatch(() => getLocationsFailed({ status: 500, message: error }, name));
	}
};

export function locationsInterceptor(action: Value): void {
	switch (action.type) {
		case GET_LOCATIONS:
			getLocations(action);
			break;
		default:
			break;
	}
}
