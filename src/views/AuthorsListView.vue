<template lang="pug">
transition(name="fade")
	.authors-list-view(
		v-show="show"
		ref="el"
	)
		s-authors-list.view__list(
			v-model="selected"
			:authors="authors"
			@update:model-value="close()"
		)
</template>

<script lang="ts" setup>
import { useVModels } from '@vueuse/core'
import { nextTick, ref, watchEffect } from 'vue'

import { SAuthorsList } from '../components/index.js'
import authors from '../data/authors.json'

interface Props {
	show: boolean
	selected: string
}

interface Emits {
	(event: 'update:show', value: boolean): void
	(event: 'update:selected', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { show, selected } = useVModels(props, emit)

const el = ref<HTMLDivElement | null>(null)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
watchEffect(async () => {
	if (!show.value) return

	await nextTick()
	let id = `#author-${selected.value}`
	let selectedEl: HTMLDivElement | null = document.querySelector(id)
	if (selectedEl && el.value) {
		el.value.scrollTop = selectedEl.offsetTop - 752
		el.value.scrollTo({
			top: selectedEl.offsetTop - 752 + 376,
			behavior: 'smooth'
		})
	}
})

function close (): void {
	show.value = false
}
</script>

<style lang="sass" scoped>
.fade-enter-active,
.fade-leave-active
	transition: opacity 0.1s ease-in

.fade-enter-from,
.fade-leave-to
	opacity: 0

.authors-list-view
	position: absolute
	inset: 0
	padding-left: 400px
	overflow: auto
	background: var(--s-color-post-background)
	will-change: scroll-position

.view__list
	padding-top: 752px
	padding-bottom: 40px
</style>
