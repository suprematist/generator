<template lang="pug">
.page
	ul.page__images
		li(ref="image1")
			image-description-view(:rendering="rendering")
		li(ref="image2")
			image-main-view
		li(
			v-if="post.image"
			ref="image3"
		)
			image-fullscreen-view
	.page__controls
		text-view
		.page__buttons
			s-button(@click="copy(text)")
				span(v-if="!copied") Copy
				span(v-else) Copied
			s-button(@click="resetPost") Clear
		ul.page__renders
			li(
				v-for="(render, index) in renders"
				:key="index"
			)
				s-button.page__renders-link(
					:href="render.src"
					:download="render.filename"
				)
					img.page__renders-img(:src="render.src")
</template>

<script setup lang="ts">
import { useStore } from '@nanostores/vue'
import { useClipboard } from '@vueuse/core'
import html2canvas from 'html2canvas'
import { nextTick, ref, watch } from 'vue'

import { SButton } from './components/index.js'
import { useVModel } from './composables/index.js'
import { $post, resetPost } from './stores/index.js'
import ImageDescriptionView from './views/ImageDescriptionView.vue'
import ImageFullscreenView from './views/ImageFullscreenView.vue'
import ImageMainView from './views/ImageMainView.vue'
import TextView from './views/TextView.vue'

const image1 = ref<HTMLDivElement | null>(null)
const image2 = ref<HTMLDivElement | null>(null)
const image3 = ref<HTMLDivElement | null>(null)

const post = useStore($post)
const text = useVModel($post, 'text')

const rendering = ref(false)
const renders = ref<Array<{ src: string; filename: string }>>([])

let timeoutId: ReturnType<typeof setTimeout> | null = null

watch(
	[post, image1, image2, image3],
	async () => {
		if (rendering.value) return

		if (timeoutId) {
			clearTimeout(timeoutId)
			timeoutId = null
		}

		timeoutId = setTimeout(async () => {
			let { year, title, author, image } = post.value
			if (
				!title ||
				!year ||
				!author ||
				!image ||
				!image1.value ||
				!image2.value ||
				!image3.value
			) {
				renders.value = []
				return
			}

			rendering.value = true
			await nextTick()

			let images = [image1.value, image2.value, image3.value]
			for (let [index, el] of images.entries()) {
				let canvas = await html2canvas(el)
				let src = canvas.toDataURL('image/png')
				let filename = `${author} ${title} ${year} ${index + 1}.png`
				renders.value[index] = { src, filename }
			}

			rendering.value = false
		}, 1000)
	},
	{ immediate: true }
)

const { copy, copied } = useClipboard({ source: text })
</script>

<style lang="sass" scoped>
.page
	display: flex
	flex-wrap: wrap
	gap: 40px

.page__images
	display: grid
	gap: 40px

.page__controls
	box-sizing: border-box
	display: flex
	flex: 1
	flex-direction: column
	gap: 180px
	width: 100%
	max-width: 1080px
	padding: 40px

.page__buttons
	display: flex
	justify-content: space-between
	padding: 20px

.page__renders
	display: flex
	gap: 60px
	margin: 0 20px

.page__renders-link
	display: flex

.page__renders-img
	width: 150px
	height: auto
</style>
