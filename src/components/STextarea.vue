<template lang="pug">
textarea.s-textarea(
  ref="textarea"
  :value="input"
	@input="handleInput"
)
</template>

<script lang="ts" setup>
import { useTextareaAutosize } from '@vueuse/core'
import { toRefs } from 'vue'

interface Props {
	modelValue: string
	modelModifiers?: {
		dimensions?: boolean
	}
}

interface Emits {
	(event: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { modelValue, modelModifiers } = toRefs(props)

const { textarea, input } = useTextareaAutosize({ input: modelValue })

function handleInput (event: Event): void {
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

<style lang="sass" scoped>
.s-textarea
  width: 100%
</style>
