// rollup.config.mjs
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

export default {
	input: 'scripts/generate2.js',
	output: {
		file: 'dist/list-page-generator/scripts/generate.js',
		format: 'cjs',
		exports: 'auto',
		banner: '#!/usr/bin/env node'
	},
	// 只保留 Node.js 内置模块为外部依赖，其他全部打包进来
	external: ['fs', 'path'],
	plugins: [
		json(),
		resolve({
			preferBuiltins: true
		}),
		commonjs(),
		copy({
			targets: [
				{ src: 'templates/*', dest: 'dist/list-page-generator/templates' },
				{ src: 'examples/*', dest: 'dist/list-page-generator/examples' },
				{ src: './SKILL.md', dest: 'dist/list-page-generator' }
			]
		})
	]
};
