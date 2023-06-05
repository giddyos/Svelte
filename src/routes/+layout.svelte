<script>
	import '../app.postcss';
	import 'carbon-components-svelte/css/white.css';

	import { Header, SkipToContent, Content } from 'carbon-components-svelte';

	let isSideNavOpen = false;
</script>

<Header company="SilfabSolar" platformName="Test" bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
</Header>

<Content>
	<slot />
</Content>
