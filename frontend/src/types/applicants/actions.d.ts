import type { Action } from '$vendor/sedux/types/action';
import type { Applicant } from './state';

export interface GetApplicants extends Action {
	job: string;
}

export interface GotApplicants extends Action {
	results: Array<Applicant>;
}

export interface GetApplicantsFailed extends Action {
	error: {
		status: number;
		message: string;
	};
}

export interface GetApplicant extends Action {
	id: string;
}

export interface GotApplicant extends Action {
	result: Applicant;
}

export interface GetApplicantFailed extends Action {
	error: {
		status: number;
		message: string;
	};
}
