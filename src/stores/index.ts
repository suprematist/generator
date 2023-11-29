/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { persistentMap } from '@nanostores/persistent'

type Post = {
	title: string
	year: string
	medium: string
	dimensions: string
	location: string
	author: string
	image: string
	imageLeft: string
	imageTop: string
	text: string
}

const DEFAULT_POST: Post = {
	title: '',
	year: '',
	medium: '',
	dimensions: '',
	location: '',
	author: 'Malevich',
	image: '',
	imageLeft: '0px',
	imageTop: '0px',
	text: ''
}

export const $post = persistentMap<Post>('post:', DEFAULT_POST)

export function resetPost (): void {
	$post.set(DEFAULT_POST)
}
