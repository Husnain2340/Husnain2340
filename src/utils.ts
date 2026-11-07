import { type CollectionEntry, getCollection } from 'astro:content';

/** Prefix an internal path with the configured `base` (needed for GitHub Pages project sites). */
export function withBase(path = '/'): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const clean = path.startsWith('/') ? path : `/${path}`;
	return `${base}${clean}`;
}

/** Published posts, newest first. Drafts are included only in dev. */
export async function getPosts(): Promise<CollectionEntry<'blog'>[]> {
	const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Rough reading time at ~220 words per minute. */
export function readingTime(body = ''): string {
	const text = body.replace(/```[\s\S]*?```/g, ' ').replace(/<[^>]+>/g, ' ');
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	return `${Math.max(1, Math.round(words / 220))} min read`;
}

export function tagSlug(tag: string): string {
	return tag
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

/** Map of tag slug -> { name, count }, sorted by count. */
export function collectTags(posts: CollectionEntry<'blog'>[]) {
	const map = new Map<string, { name: string; count: number }>();
	for (const post of posts) {
		for (const tag of post.data.tags) {
			const slug = tagSlug(tag);
			const entry = map.get(slug) ?? { name: tag, count: 0 };
			entry.count++;
			map.set(slug, entry);
		}
	}
	return [...map.entries()].sort((a, b) => b[1].count - a[1].count || a[1].name.localeCompare(b[1].name));
}
