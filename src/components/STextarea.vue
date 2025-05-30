<script lang="ts" setup>
import { useTextareaAutosize } from '@vueuse/core'
import { computed, toRefs } from 'vue'

interface Props {
	modelValue: string
	modelModifiers?: {
		dimensions?: boolean
	}
	rendering?: boolean
}

interface Emits {
	(event: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { modelValue, modelModifiers, rendering } = toRefs(props)

const { textarea, input } = useTextareaAutosize({ input: modelValue })

const inputHtml = computed(() => {
	return input.value.replaceAll('\n', '<br>')
})

function handleInput(event: Event): void {
	let value = (event.target as HTMLTextAreaElement).value
	if (modelModifiers.value?.dimensions) {
		value = value
			.replaceAll(/[Xx]/g, '×')
			.replaceAll('"', '″')
			.replaceAll(',', '.')
	}
	emit('update:modelValue', value)
}
</script>

<template>
	<textarea
		v-if="!rendering"
		ref="textarea"
		:value="input"
		@input="handleInput"
		class="s-textarea"
	></textarea>
	<div
		v-else
		v-html="inputHtml"
		class="s-textarea"
	></div>
</template>

<style lang="sass" scoped>
.s-textarea
	width: 100%
</style>
