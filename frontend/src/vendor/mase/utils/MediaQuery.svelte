<script lang="ts">
	import { onMount } from 'svelte';

	export let query;

	let mql: MediaQueryList;
	let mqlListener: (v: any) => boolean;
	let wasMounted: boolean = false;
	let matches: boolean = false;

	onMount(() => {
		wasMounted = true;
		return () => {
			removeActiveListener();
		};
	});

	$: {
		if (wasMounted) {
			removeActiveListener();
			addNewListener(query);
		}
	}

	function addNewListener(query): void {
		mql = window.matchMedia(query);
		mqlListener = (v) => (matches = v.matches);
		mql.addListener(mqlListener);
		matches = mql.matches;
	}

	function removeActiveListener(): void {
		if (mql && mqlListener) {
			mql.removeListener(mqlListener);
		}
	}
</script>

<slot {matches} />
