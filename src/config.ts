import { defineCollection } from "astro/content/config";
import { z } from "astro/zod";

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        role: z.string(),
        semester: z.number().int().min(1).max(6),
        period: z.string(),
        company: z.string().optional(),
        stack: z.array(z.string()),
        repo: z.url(),
        image: z.string().optional(),
        featured: z.boolean().default(false)
    })
});

export const collections = {
    projects: projectsCollection
};