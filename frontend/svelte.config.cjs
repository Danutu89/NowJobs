const sveltePreprocess = require('svelte-preprocess');
const { resolve } = require('path');
const babel = require('vite-babel-plugin');
const node = require('@sveltejs/adapter-node');
const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess(),
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: node(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			},
			resolve: {
				alias: {
					$components: resolve('src/components'),
					$actions: resolve('./src/actions'),
					$stores: resolve('./src/stores'),
					$utils: resolve('./src/utils'),
					$constants: resolve('./src/constants'),
					$reducers: resolve('./src/reducers'),
					$interceptors: resolve('./src/interceptors'),
					$vendor: resolve('./src/vendor')
				}
			},
			plugins: [babel]
		}
	}
};
