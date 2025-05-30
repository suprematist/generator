import { defineConfig } from '@euaaaio/eslint-config'

export default defineConfig(
	{
		typescript: true,
		vue: true,
		stylistic: {
			indent: 'tab',
		},
		perfectionist: true,
	},
	{
		name: 'suprematist/node/overrides',
		rules: {
			'n/no-unsupported-features/node-builtins': ['error', {
				ignores: [
					'URL.createObjectURL',
					'URL.revokeObjectURL',
				],
			}],
		},
	},
)
