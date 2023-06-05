<script lang="ts">
	import type { Panel } from '../types';

	// Components
	import LightBox from '../components/LightBox.svelte';
	import PanelSearch from '../components/PanelSearch.svelte';
	import PanelPreloader from '../components/PanelPreloader.svelte';
	import { Grid, Row, Column, ProgressBar, ButtonSet, Button } from 'carbon-components-svelte';


	let panels: Panel[] = [];
	let current_panel: Panel;

	$: {
		if (preloaded_panels.length > 0 && !current_panel) {
			current_panel = panels[0];
		}
	}

	let preloaded_panels: Panel[] = [];
	let panels_to_preload: number = 1;
	let panel_limit: number = 10;

	function nextPanel() {
		current_panel = panels[current_panel.id + 1]
		panel_limit += 10
		panels_to_preload += 1
	}

	function previousPanel() {
		current_panel = panels[current_panel.id - 1]
	}
</script>

<PanelPreloader
	bind:limit={panel_limit}
	bind:preloaded_panels
	bind:panels_to_preload
	bind:panels
	on:preloaded={(_) => {
		panels_to_preload += 1;
		console.log(preloaded_panels);
	}}
/>

<main>
	<Grid>
		{#if preloaded_panels.length > 0}
			{#if preloaded_panels.length < panels.length}
				<Row class="pl-4 pb-4">
					<ProgressBar
						class="w-full"
						value={preloaded_panels.length}
						max={panels.length}
						helperText="{preloaded_panels.length} of {panels.length} Panels Downloaded"
					/>
				</Row>
			{/if}
			{#if current_panel}
				<Row>
					<div>
						<LightBox bind:panel={current_panel} />
						<ButtonSet>
							<Button disabled={current_panel.id <= 0} on:click={previousPanel} kind="secondary">Previous</Button>
							<Button disabled={current_panel.id >= preloaded_panels.length} on:click={nextPanel}>Next</Button>
							<p>Current Panel ID: {current_panel.id}</p>
						  </ButtonSet>
					</div>
				</Row>
			{:else}
				Loading...
			{/if}
		{/if}
		<Row>
			<Column class="pt-10">
				<PanelSearch bind:panels />
			</Column>
		</Row>
	</Grid>
</main>
