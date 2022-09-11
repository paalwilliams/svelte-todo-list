<script lang="ts">
	import { onMount } from 'svelte';
	import Loading from './Layout/Loading.svelte';
	import ToDoitem from './ToDoItem.svelte';
	import { state } from '../shared/Store';
	import { getToDoItems } from '../shared/utils';
	import { initializeDB } from '../shared/utils';

	onMount(async () => {
		await initializeDB();
		await getToDoItems();
	});
</script>

<div class="todocontainer">
	{#if $state.length > 0}
		{#each $state as todo}
			<ToDoitem {todo} />
		{/each}
	{:else if !$state.length}
		<p>None</p>
	{:else}
		<Loading />
	{/if}
</div>

<style>
	div.todocontainer {
		display: flex;
		flex-direction: column;
		width: 80%;
		justify-content: center;
		margin: 0 auto;
	}
</style>
