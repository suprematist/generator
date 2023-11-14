<template lang="pug">
textarea.s-textarea(
  ref="textarea"
  v-model="input"
)
</template>

<script lang="ts" setup>
import { syncRef, useTextareaAutosize, useVModel } from '@vueuse/core'

interface Props {
	modelValue: string
}

interface Emits {
	(event: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const modelValue = useVModel(props, 'modelValue', emit)
const { textarea, input } = useTextareaAutosize()

syncRef(modelValue, input)
</script>

<style lang="sass" scoped>
.s-textarea
  width: 100%
</style>
