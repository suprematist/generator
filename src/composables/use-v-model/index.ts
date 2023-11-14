import type { MapStore, StoreValue } from 'nanostores'
import type { WritableComputedRef } from 'vue'

import { useStore } from '@nanostores/vue'
import { computed } from 'vue'

export function useVModel <
	SomeStore extends MapStore,
	Value extends StoreValue<SomeStore>,
	Key extends keyof Value
> (store: SomeStore, key: Key): WritableComputedRef<Value[Key]> {
	let state = useStore(store)
	return computed({
		get: () => state.value[key],
		set (value) {
			store.setKey(key, value)
		}
	})
}
