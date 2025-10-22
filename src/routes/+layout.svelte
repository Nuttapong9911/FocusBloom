<script lang="ts">
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'
	import Navbar from '../components/navbar.svelte'
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="h-screen flex bg-[#FDF8E1]">
	<Navbar />

	<div class="flex-1 overflow-auto ">
		{@render children?.()}
	</div>
</div>
