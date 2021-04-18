import { dispatch } from '$vendor/sedux';
import { request } from '$utils/request';
import type { Value } from '$vendor/sedux/types/storex';
import type { Response } from '$types/response';
import { GET_CATEGORIES } from '$constants/categories';
import type { GetCategories } from '$types/categories/actions';
import { getCategoriesFailed, gotCategories } from '$actions/categories';
import type { Category } from '$types/categories';
import type { Option } from '$vendor/mase/Select/types/option';

const getCategories = async ({ search, name }: GetCategories): Promise<void> => {
	try {
		const res = await request.get('/api/jobs/categories', { search });
		const json: Response<Array<Category>> = await res.json();
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

			return dispatch(() => getCategoriesFailed({ status: res.status, message: error }, name));
		}
		const parsed: Array<Option> = json.map((category) => ({
			value: category.id,
			text: category.name
		}));
		return dispatch(() => gotCategories(parsed, name));
	} catch (error) {
		return dispatch(() => getCategoriesFailed({ status: 500, message: error }, name));
	}
};

export function categoriesInterceptor(action: Value): void {
	switch (action.type) {
		case GET_CATEGORIES:
			getCategories(action);
			break;

		default:
			break;
	}
}
