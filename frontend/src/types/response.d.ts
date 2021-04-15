export interface ErrorResponse {
	non_field_errors?: Array<string>;
	detail?: string;
	details?: Array<string>;
}

export interface PaginatedResponse<T> extends ErrorResponse {
	results: Array<T>;
	count: number;
	next: string;
	prev: string;
}
