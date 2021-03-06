const jsonRequest = {
	version: '[VERSION]',
	request(
		method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT',
		url: string,
		data?: any,
		options?: any
	): Promise<Response> {
		const defaults = {
			method: method.toUpperCase(),
			credentials: 'same-origin',
			strictErrors: false
		};
		const settings = { ...defaults, ...options };
		const isGetRequest = settings.method === 'GET';
		const jsonHeaders = { Accept: 'application/json' };
		if (!isGetRequest && !(data instanceof FormData))
			jsonHeaders['Content-Type'] = 'application/json';
		//else if (!isGetRequest && data instanceof FormData) jsonHeaders["Content-Type"] = 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW';
		settings.headers = {
			...jsonHeaders,
			...(options && options.headers)
		};
		const toPair = (key) => key + '=' + encodeURIComponent(data[key]); //build query string field-value
		const paramKeys = isGetRequest && data && Object.keys(data);
		if (paramKeys && paramKeys.length)
			url = url + (url.includes('?') ? '&' : '?') + paramKeys.map(toPair).join('&');
		if (!isGetRequest && data)
			settings.body = data instanceof FormData ? data : JSON.stringify(data);
		const logUrl = url.replace(/[?].*/, ''); //security: prevent logging url parameters
		const logDomain = logUrl.replace(/.*:[/][/]/, '').replace(/[:/].*/, ''); //extract hostname
		const toJson = (response) => {
			const contentType = response.headers.get('content-type');
			const isJson = /json|javascript/.test(contentType); //match "application/json" or "text/javascript"
			const textToObj = (httpBody) => {
				//rest calls should only return json
				response.error = !response.ok;
				response.contentType = contentType;
				response.bodyText = httpBody;
				return response;
			};
			if (jsonRequest.logger)
				jsonRequest.logger(
					new Date().toISOString(),
					'response',
					settings.method,
					logDomain,
					logUrl,
					response.ok,
					response.status,
					response.statusText,
					contentType
				);
			if (settings.strictErrors && !response.ok)
				throw Error('HTTP response status ("strictErrors" mode enabled): ' + response.status);
			return isJson ? response : response.text().then(textToObj);
		};
		if (jsonRequest.logger)
			jsonRequest.logger(new Date().toISOString(), 'request', settings.method, logDomain, logUrl);
		return fetch(url, settings);
	},
	get: (url: string, params?: any, options?: any) =>
		jsonRequest.request('GET', url, params, options),
	post: (url: string, resource?: any, options?: any) =>
		jsonRequest.request('POST', url, resource, options),
	put: (url: string, resource?: any, options?: any) =>
		jsonRequest.request('PUT', url, resource, options),
	patch: (url: string, resource?: any, options?: any) =>
		jsonRequest.request('PATCH', url, resource, options),
	delete: (url: string, resource?: any, options?: any) =>
		jsonRequest.request('DELETE', url, resource, options),
	logger: null, //null or a function
	getLogHeaders(): Array<unknown> {
		return ['Timestamp', 'HTTP', 'Method', 'Domain', 'URL', 'Ok', 'Status', 'Text', 'Type'];
	},
	getLogHeaderIndex(): Record<string, number> {
		return {
			timestamp: 0,
			http: 1,
			method: 2,
			domain: 3,
			url: 4,
			ok: 5,
			status: 6,
			text: 7,
			type: 8
		};
	},
	enableLogger(booleanOrFn): any {
		const isFn = typeof booleanOrFn === 'function';
		jsonRequest.logger = isFn ? booleanOrFn : booleanOrFn === false ? null : console.log;
		return jsonRequest.logger;
	}
};

export { jsonRequest as request };
