<script lang="ts" setup>
</script>

<template>
  <button class="s-button">
    <slot></slot>
  </button>
</template>

<style lang="sass" scoped>
.s-button
	--s-button-background: var(--s-color-button-background)
	--s-button-hover-background: var(--s-color-button-hover-background)
	--s-button-active-background: var(--s-color-button-active-background)
	position: relative
	z-index: 0

.s-button:before
	position: absolute
	inset: -20px
	z-index: -1
	content: ""
	background: var(--s-button-background)
	border-radius: 20px
	transition: background 0.15s ease-in

.s-button:hover:before
	background: var(--s-button-hover-background)

.s-button:active:before
	background: var(--s-button-active-background)
</style>
