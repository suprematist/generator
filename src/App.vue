<script setup lang="ts">
import { useStore } from '@nanostores/vue'
import { useClipboard } from '@vueuse/core'
import html2canvas from 'html2canvas'
import { nextTick, onUpdated, ref, useTemplateRef } from 'vue'
import { SButton } from './components/index.js'
import { useVModel } from './composables/index.js'
import { $post, resetPost } from './stores/index.js'
import ImageDescriptionView from './views/ImageDescriptionView.vue'
import ImageFullscreenView from './views/ImageFullscreenView.vue'
import ImageMainView from './views/ImageMainView.vue'
import TextView from './views/TextView.vue'

const image1 = useTemplateRef('image1')
const image2 = useTemplateRef('image2')
const image3 = useTemplateRef('image3')

const post = useStore($post)
const text = useVModel($post, 'text')

const rendering = ref(false)
const renders = ref<Array<{ src: string, filename: string }>>([])

onUpdated(render)

let timeoutId: ReturnType<typeof setTimeout> | null = null
let skipNext = false

function resetTimeout(): void {
	if (timeoutId) {
		clearTimeout(timeoutId)
		timeoutId = null
	}
}

async function render(): Promise<void> {
	let { year, title, author, image } = post.value

	// prevent multiple rendering
	if (skipNext) {
		return
	}

	// prevent rendering if required data is missing
	if (
		!title
		|| !year
		|| !author
		|| !image
		|| !image1.value
		|| !image2.value
		|| !image3.value
	) {
		resetTimeout()
		skipNext = true
		renders.value = []
		await nextTick()
		skipNext = false
		return
	}

	resetTimeout()

	timeoutId = setTimeout(async () => {
		skipNext = true
		renders.value = []
		rendering.value = true
		await nextTick()

		let images = [
			image1.value as HTMLElement,
			image2.value as HTMLElement,
			image3.value as HTMLElement,
		]
		for (let [index, el] of images.entries()) {
			let src = await new Promise<null | string>((resolve) => {
				html2canvas(el, { logging: false })
					.then((canvas) => {
						canvas.toBlob((blob) => {
							resolve(blob ? URL.createObjectURL(blob) : null)
						}, 'image/png')
					})
					.catch((error: unknown) => {
						console.error(error)
						resolve(null)
					})
			})
			if (!src) {
				continue
			}

			let filename = `${author}_${title}_${year}_${index + 1}.png`
			filename = filename.replaceAll(/\s/g, '-')
			renders.value[index] = { src, filename }
			await nextTick()
		}

		rendering.value = false
		await nextTick()
		skipNext = false
	}, 3000)
}

const { copy, copied } = useClipboard({ source: text })
</script>

<template>
	<div class="page">
		<ul class="page__images">
			<li ref="image1">
				<image-description-view :rendering="rendering" />
			</li>
			<li ref="image2">
				<image-main-view />
			</li>
			<li
				v-if="post.image"
				ref="image3"
			>
				<image-fullscreen-view />
			</li>
		</ul>
		<div class="page__controls">
			<text-view />
			<div class="page__buttons">
				<s-button @click="copy(text)">
					<span v-if="!copied">Copy</span>
					<span v-else>Copied</span>
				</s-button>
				<s-button @click="resetPost">Clear</s-button>
			</div>
			<ul class="page__renders">
				<li
					v-for="(item, index) in renders"
					:key="index"
				>
					<a
						:href="item.src"
						:download="item.filename"
					>
						<s-button class="page__renders-link">
							<img class="page__renders-img" :src="item.src" />
						</s-button>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.page {
	display: flex;
	flex-wrap: wrap;
	gap: 40px;
}

.page__images {
	display: grid;
	gap: 40px;
}

.page__controls {
	box-sizing: border-box;
	display: flex;
	flex: 1;
	flex-direction: column;
	gap: 180px;
	width: 100%;
	max-width: 1080px;
	padding: 40px;
}

.page__buttons {
	display: flex;
	justify-content: space-between;
	padding: 20px;
}

.page__renders {
	display: flex;
	gap: 60px;
	margin: 0 20px;
}

.page__renders-link {
	display: flex;
}

.page__renders-img {
	width: 150px;
	height: auto;
}
</style>
