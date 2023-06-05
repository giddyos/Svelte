<script lang="ts">
	import { InlineNotification } from 'carbon-components-svelte';
	import { errors } from '../store';
	export let category: string;
</script>

{#if $errors[category]}
	{#each $errors[category] as error, i (error)}
		<InlineNotification
			on:close={() => {
				errors.remove(category, i);
			}}
			kind="error"
			title={error.title}
			subtitle={error.message}
		/>
	{/each}
{/if}
