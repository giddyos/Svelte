<script lang="ts">
	import type { Panel } from '../types';

	import {
		TextArea,
		Button,
		ButtonSet,
		InlineLoading,
	} from 'carbon-components-svelte';
	import { errors } from '../store';
	import Errors from './Errors.svelte';

	import axios from 'axios';

	export let panels: Panel[];

	let search: string = '';
	let is_searching = false;

	$: {
		search = search.replace(/[^a-zA-Z0-9 |\n]/g, '');
		search = search.split('|').join('\n')
		search = search.split(' ').join('\n').toUpperCase();
	}

	async function HandleSearch() {
		is_searching = true;

		let payload = search.split('\n');
		payload = [...new Set(payload)];

		payload = payload.filter((value) => value.length >= 10 && value.length <= 14);

		axios
			.post('/api/panels', payload)
			.then((res) => {
				for (let i = 0; i < res.data.length; i++) {
					let data = res.data[i];

					if (panels.find((panel) => panel.serial == data.serial)) {
						continue;
					}

					panels.push({
						id: i,
						serial: data.serial,
						images: data.images,
						preloaded: 0
					})

					panels = panels

					console.log(panels)
				}
			})
			.catch((err) => {
				console.log(err);
				errors.add('PanelSearch', {
					title: 'Error fetching panels:',
					message: 'There was an error fetching the panels. Please try again.'
				});
			})
			.finally(() => {
				is_searching = false;
			});
	}
</script>

<section>
	<Errors category="PanelSearch" />

	<TextArea bind:value={search} placeholder="Paste the panels serial numbers here." />
	<div class="pb-4" />
	<ButtonSet>
		<Button disabled={is_searching} on:click={() => (search = '')} kind="ghost">Clear</Button>
		{#if is_searching}
			<div class="pr-2" />
			<InlineLoading description="Fetching Panels." />
		{:else}
			<Button disabled={search.length < 12} on:click={HandleSearch}>Search</Button>
		{/if}
	</ButtonSet>
</section>
