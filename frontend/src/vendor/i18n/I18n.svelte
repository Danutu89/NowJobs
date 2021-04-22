<script>
	import { createSlicer, dispatch } from '../sedux';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { i18nReducer } from './reducer';
	import { languages } from './store';
	import { loadLanguages } from './actions';
	import { CHANGE_LANGUAGE } from './constants';
	import { addListener } from '../sedux/listener';

	export let translations;

	let loaded = false,
		completeLoad = false;

	const handleChangeLocale = ({ locale }) => {
		const rootElement = document.documentElement;
		rootElement.setAttribute('lang', locale);
	};

	onMount(() => {
		const slicer = createSlicer(null, i18nReducer, 'i18n', languages, 'locale');

		if (typeof window !== 'undefined') {
			const locale =
				(navigator.languages && navigator.languages[0]) || // Chrome / Firefox
				navigator.language;

			const rootElement = document.documentElement;
			rootElement.setAttribute(`lang`, `${locale.slice(0, 2)}`);

			slicer.subscribe(({ i18n }) => {
				const state = get(i18n.state);

				loaded = i18n._persistLoaded;

				if (typeof state !== 'undefined' && state.locale) {
					rootElement.setAttribute(`lang`, `${state.locale}`);
				}
			});

			languages.subscribe((value) => {
				completeLoad = loaded && value.locales !== null;
			});

			dispatch(() => loadLanguages(translations, locale.slice(0, 2), 'i18n'));

			addListener(CHANGE_LANGUAGE, handleChangeLocale);
		}
	});
</script>

<svelte:head>
	{#if completeLoad}
		{#each Object.keys($languages.locales) as lang}
			<link rel="alternate" href="https://jobs.new-app.dev" hreflang={lang} />
		{/each}
	{/if}
</svelte:head>

{#if completeLoad === true}
	<slot />
{/if}
