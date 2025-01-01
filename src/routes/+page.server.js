import prisma from "../lib/prisma";
import { fail } from '@sveltejs/kit';

export const load = (async () => {
    const response = await prisma.post.findMany();
    return { feed: response };
});

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const title = data.get('title');

        if (!title) {
            return fail(400, { error: 'Title is required' });
        }

        try {
            await prisma.post.create({
                data: {
                    title: title.toString(),
                }
            });
            return { success: true };

            // ...existing code...
        } catch (error) {
            console.error('Failed to create post:', error);
            return fail(500, { error: 'Failed to create post' });
        }
    }
};
