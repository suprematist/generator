/* eslint-disable unicorn/no-array-reduce */
import type { MapStore, StoreValue } from 'nanostores'
import type { WritableComputedRef } from 'vue'

import { useStore } from '@nanostores/vue'
import { computed } from 'vue'

export function useVModels <
	SomeStore extends MapStore,
	Value extends StoreValue<SomeStore>,
	Key extends keyof Value
> (store: SomeStore): {
	[K in Key]: WritableComputedRef<Value[K]>
} {
	let state = useStore(store)
	let keys = Object.keys(state.value)
	return keys.reduce((reduced, key) => {
		reduced[key as Key] = computed({
			get: () => state.value[key],
			set: value => {
				store.setKey(key, value)
			}
		})
		return reduced
	}, {} as { [K in Key]: Value[K] })
}
