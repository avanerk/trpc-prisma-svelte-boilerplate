import type { inferAsyncReturnType } from '@trpc/server';
import * as trpc from '@trpc/server';
import trpcTransformer from 'trpc-transformer';
import users from './users';
import posts from './posts';

export const createContext = async () => ({});

export const router = trpc
  .router<inferAsyncReturnType<typeof createContext>>()
  .transformer(trpcTransformer)
  .merge('users:', users)
  .merge('posts:', posts)

export type Router = typeof router;
