// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";

// ../../packages/mdx/src/remarkHeading.js
import Slugger from "github-slugger";
import { visit } from "unist-util-visit";
var slugger = new Slugger();
var remarkHeading = () => {
  return (tree, file) => {
    const toc = [];
    slugger.reset();
    visit(tree, "heading", (node) => {
      node.data ||= {};
      node.data.hProperties ||= {};
      const text = node.children[0].value;
      const id = slugger.slug(text);
      node.data.hProperties.id = id;
      toc.push({
        title: text,
        url: id,
        depth: node.depth
      });
      return "skip";
    });
    file.data["toc"] = toc;
  };
};

// content-collections.ts
var posts = defineCollection({
  name: "posts",
  directory: "./posts",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    summary: z.string()
  }),
  transform: async (post, context) => {
    const mdx = await compileMDX(context, post, {
      remarkPlugins: [remarkHeading]
    });
    return {
      ...post,
      mdx
    };
  }
});
var content_collections_default = defineConfig({
  collections: [posts]
});
export {
  content_collections_default as default
};
