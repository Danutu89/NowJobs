import { GET_CATEGORIES, GET_CATEGORIES_FAILED, GOT_CATEGORIES } from '$constants/categories';
import type { GetCategories, GetCategoriesFailed, GotCategories } from '$types/categories/actions';
import type { Option } from '$vendor/mase/Select/types/option';

export const getCategories = (name: string, domain = '', search = ''): GetCategories => {
	return {
		type: GET_CATEGORIES,
		name,
		search,
		domain
	};
};

export const gotCategories = (results: Array<Option>, name: string): GotCategories => {
	return {
		type: GOT_CATEGORIES,
		name,
		results
	};
};

export const getCategoriesFailed = (
	error: { status: number; message: string },
	name: string
): GetCategoriesFailed => {
	return {
		type: GET_CATEGORIES_FAILED,
		error,
		name
	};
};
