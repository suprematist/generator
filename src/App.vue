<template lang="pug">
.page
	ul.page__list
		li(ref="image1")
			image-description-view(:rendering="downloading")
		li(ref="image2")
			image-main-view
		li(
			v-if="image"
			ref="image3"
		)
			image-fullscreen-view
	.page__text
		text-view
		.page__text-controls
			.page__text-controls-group
				s-button.page__download(
					:disable="downloading"
					@click="download"
				)
					span(v-if="!downloading") Download
					span(v-else) Downloading…
				s-button(@click="copy(text)")
					span(v-if="!copied") Copy
					span(v-else) Copied
			s-button(@click="reset") Clear
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import html2canvas from 'html2canvas'
import { nextTick, ref } from 'vue'

import { SButton } from './components/index.js'
import { useVModels } from './composables/index.js'
import { $post, resetPost } from './stores/index.js'
import ImageDescriptionView from './views/ImageDescriptionView.vue'
import ImageFullscreenView from './views/ImageFullscreenView.vue'
import ImageMainView from './views/ImageMainView.vue'
import TextView from './views/TextView.vue'

const image1 = ref<HTMLDivElement | null>(null)
const image2 = ref<HTMLDivElement | null>(null)
const image3 = ref<HTMLDivElement | null>(null)

const downloading = ref(false)

const {
	text,
	year,
	title,
	image,
	author
} = useVModels($post)

const { copy, copied } = useClipboard({ source: text })

function reset (): void {
	resetPost()
}

async function download (): Promise<void> {
	if (!image1.value || !image2.value || !image3.value) return

	downloading.value = true
	await nextTick()

	let link = document.createElement('a')

	let images = [image1.value, image2.value, image3.value]
	for (let [index, el] of images.entries()) {
		let canvas = await html2canvas(el)
		link.download =
			`${author.value} ${title.value} ${year.value} ${index + 1}.png`
		link.href = canvas.toDataURL('image/png')
		link.click()
		await new Promise(resolve => setTimeout(resolve, 2000))
	}

	link.remove()
	downloading.value = false
}
</script>

<style lang="sass" scoped>
.page
	display: flex
	flex-wrap: wrap
	gap: 40px

.page__list
	display: grid
	gap: 40px

.page__text
	box-sizing: border-box
	display: flex
	flex: 1
	flex-direction: column
	gap: 180px
	width: 100%
	max-width: 1080px
	padding: 40px

.page__text-controls
	display: flex
	justify-content: space-between
	padding: 20px

.page__text-controls-group
	display: flex
	gap: 60px
</style>
