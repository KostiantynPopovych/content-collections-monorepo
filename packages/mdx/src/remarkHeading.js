import Slugger from 'github-slugger';
import { visit } from 'unist-util-visit';

const slugger = new Slugger();

export const remarkHeading = () => {
	return (tree, file) => {
		const toc = [];
		slugger.reset();

		visit(tree, 'heading', (node) => {
			node.data ||= {};
			node.data.hProperties ||= {};

			const text = node.children[0].value;
			const id = slugger.slug(text);

			node.data.hProperties.id = id;

			toc.push({
				title: text,
				url: id,
				depth: node.depth,
			});

			return 'skip';
		});

		file.data['toc'] = toc;
	};
};
