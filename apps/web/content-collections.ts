import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from '@content-collections/mdx';
import {remarkHeading} from "../../packages/mdx/src/remarkHeading";

const posts = defineCollection({
	name: "posts",
	directory: "./posts",
	include: "**/*.mdx",
	schema: (z) => ({
		title: z.string(),
		summary: z.string(),
	}),
	transform: async (post, context) => {
		const mdx = await compileMDX(context, post, {
			remarkPlugins: [remarkHeading],
		});
		return {
			...post,
			mdx
		}
	}
});

export default defineConfig({
	collections: [posts],
});
