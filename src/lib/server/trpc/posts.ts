import prismaClient from '$lib/server/prismaClient';
import { trim } from '$lib/zodTransformers';
import * as trcp from '@trpc/server';
import { z } from 'zod';

export default trcp
    .router()
    .query('list', {
        resolve: () =>
        prismaClient.post.findMany({
            select: {id: true, title: true, body: true, user: { select: { username: true } }},
        })
    })
    .query('read', {
        input: z.string(),
        resolve: ({input: id}) => {
            prismaClient.post.findUnique({
                where: { id },
                select: { id: true, title: true, body: true, userId: true},
            })
        }
    })
    .mutation('save', {
        input: z.object({
            id: z.string().nullable(),
            title: z.string().min(3).max(50).transform(trim),
            body: z.string().min(3).transform(trim),
            userId: z.string().min(1, 'Must be set')
        }),
        resolve: ({ input: { id, ...data } }) =>
            id
            ? prismaClient.post.update({ data, where: { id }, select: { id: true } })
            : prismaClient.post.create({ data, select: { id: true } })
    })
    .mutation('delete', {
        input: z.string(),
        resolve: ({ input: id }) => prismaClient.post.delete({ where: { id } }).then(() => undefined)
    });