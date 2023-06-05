<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Panel } from '../types';

	const dispatch = createEventDispatcher();
	export let panels: Panel[];
	export let panels_to_preload: number = 1;
	export let preloaded_panels: Panel[] = [];
	export let limit: number = 100;

	let IsDone = () => {
		return preloaded_panels.length == limit || preloaded_panels.length == panels.length;
	};

	function HandleLoad(panel: Panel, index: number) {
		console.log(index);
		panels[index].preloaded += 1;

		if (panel.preloaded == 2) {
			preloaded_panels[index] = panel;
			dispatch('preloaded', preloaded_panels);
		}
	}
</script>

<svelte:head>
	{#each panels.slice(0, panels_to_preload) as panel, i}
		{#if i <= limit && !IsDone()}
			<img src={panel.images.colored} alt="colored" on:load={() => HandleLoad(panel, i)} />
			<img src={panel.images.xray} alt="xray" on:load={() => HandleLoad(panel, i)} />
		{/if}
	{/each}
</svelte:head>
