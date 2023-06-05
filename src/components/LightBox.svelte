<script lang="ts">
    	import {
		Grid,
		Row,
		Column,
		ProgressBar,
		Tabs,
		Tab,
		TabContent,
	} from 'carbon-components-svelte';
    
	import 'simplelightbox/dist/simple-lightbox.min.css'
    import { onMount } from 'svelte';
    import type { Panel } from '../types';

    export let panel: Panel;
    let lightbox
  
    onMount(() => {

    const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/simplelightbox/2.1.0/simple-lightbox.min.js';
      script.async = true;
      document.body.appendChild(script);
  
      script.onload = () => {
        const lightbox = new SimpleLightbox('.gallery a', {
            disableRightClick: true,
            maxZoom: 1000,
            doubleTapZoom: 10
        });
        console.log(lightbox)
      };

    // const SimpleLightbox = require('simplelightbox');
    // const lightbox = new SimpleLightbox('.gallery a');
    });
  </script>
        
        <Tabs class="pl-4" autoWidth={true} type="container">
            <Tab label="Colored Image" />
            <Tab label="X-Ray Image" />
            <svelte:fragment slot="content">
                <div class="gallery">
                <TabContent><a href={panel.images.colored} class="image">
                    <img src={panel.images.colored} alt="Imag a" />
                </a></TabContent>
                <TabContent><a href={panel.images.xray} class="image">
                    <img src={panel.images.xray} alt="Imag a" />
                </a></TabContent>
            </div>
                <!-- <LightBox bind:panel={current_panel} /> -->
            </svelte:fragment>
        </Tabs>
