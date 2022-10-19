import trpc from '$lib/client/trpc';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch }) => {
  const users = await trpc(fetch).query('users:list');
  return { users };
};
