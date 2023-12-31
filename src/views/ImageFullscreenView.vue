<template lang="pug">
.view(ref="el")
	img.view__image(
		v-if="image"
		ref="imageEl"
		:class="`view__image--${imageOrientation}`"
		:style="imageStyle"
		:src="image"
	)
</template>

<script lang="ts" setup>
import { useDraggable, useElementBounding, useEventListener } from '@vueuse/core'
import { computed, ref, unref, watch } from 'vue'

import { useVModel } from '../composables/index.js'
import { $post } from '../stores/index.js'

const image = useVModel($post, 'image')
const imageLeft = useVModel($post, 'imageLeft')
const imageTop = useVModel($post, 'imageTop')

const el = ref<HTMLElement | null>(null)
const imageEl = ref<HTMLImageElement | null>(null)

const imageSize = ref({ width: 0, height: 0 })
const imageStyle = computed(() => ({
	left: imageLeft.value,
	top: imageTop.value
}))
const imageOrientation = computed(
	() => imageSize.value.width > imageSize.value.height
		? 'landscape'
		: 'portrait'
)

watch(
	image,
	async (newImage, oldImage) => {
		if (!image.value) return
		let img = new Image()
		img.src = image.value
		// eslint-disable-next-line unicorn/prefer-add-event-listener
		img.onload = (): void => {
			imageSize.value = {
				width: img.width,
				height: img.height
			}
		}
		img.remove()
		if (oldImage && newImage !== oldImage) {
			imageLeft.value = '0px'
			imageTop.value = '0px'
		}
	},
	{ immediate: true }
)

const { top: elTop, left: elLeft } = useElementBounding(el)

useDraggable(imageEl, {
	preventDefault: true,
	onMove: ({ x, y }) => {
		let top = imageOrientation.value === 'portrait'
			? Math.max(Math.min(y - unref(elTop), 0), 1080 - imageEl.value!.height)
			: 0
		let left = imageOrientation.value === 'landscape'
			? Math.max(Math.min(x - unref(elLeft), 0), 1080 - imageEl.value!.width)
			: 0
		imageLeft.value = `${left}px`
		imageTop.value = `${top}px`
	}
})

useEventListener(imageEl, 'touchmove', event => {
	event.preventDefault()
}, { passive: false })
</script>

<style lang="sass" scoped>
.view
	position: relative
	width: 1080px
	height: 1080px
	overflow: hidden
	background: var(--s-color-post-background)

.view__image
	position: absolute
	object-fit: cover
	cursor: all-scroll

.view__image--portrait
	width: 1080px

.view__image--landscape
	height: 1080px
</style>
