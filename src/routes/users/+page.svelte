<script lang="ts">
    import getEditorErrors from '$lib/client/getEditorErrors';
    import type { InferMutationInput } from '$lib/client/trpc';
    import trpc from '$lib/client/trpc';
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
  
    export let data: PageData;
  
    const reloadUsers = async () => {
      data.users = await trpc().query('users:list');
    };

    onMount(() => {
        reloadUsers();
	});

  
  </script>
  
  <svelte:head>
    <title>Users</title>
  </svelte:head>
  
  <h1>
    The Users: {JSON.stringify(data.users)}
</h1>