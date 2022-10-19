import prismaClient from '$lib/server/prismaClient';
import { falsyToNull, trim } from '$lib/zodTransformers';
import * as trcp from '@trpc/server';
import { z } from 'zod';

export default trcp
    .router()
    .query('browse', {
        input: z.string().optional(),
        resolve: ({ input }) =>
          prismaClient.user.findMany({
            select: {
              id: true,
              username: true,
              _count: { select: { posts: true } },
              updatedAt: true
            },
            where: input
              ? { OR: [{ username: { contains: input } }] }
              : undefined,
            orderBy: [{ username: 'asc' }]
          })
      })
    .query('list', {
        resolve: () =>
        prismaClient.user.findMany({
            select: {id: true, username: true},
        })
    })
    .query('read', {
        input: z.string(),
        resolve: ({input: id}) => {
            prismaClient.user.findUnique({
                where: { id },
                select: { id: true, username: true, bio: true},
            })
        }
    })
    .mutation('save', {
      input: z.object({
        id: z.string(),
        username: z.string().min(3).max(50).transform(trim),
        bio: z.string().max(1000).transform(trim).transform(falsyToNull)
      }),
      resolve: ({ input: { id, ...data } }) =>
        id
          ? prismaClient.user.update({data, where: { id }, select: { id: true }})
          : prismaClient.user.create({data, select: { id: true }})
    })
    .mutation('delete', {
      input: z.string(),
      resolve: ({input: id}) => prismaClient.user.delete({where: { id }}).then(() => undefined)
    });